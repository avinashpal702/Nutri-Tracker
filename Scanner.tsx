"use client";

import { useState, useEffect, useRef, useCallback } from "react";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faClose } from '@fortawesome/free-solid-svg-icons'

export default function Scanner({ handleResult }: { handleResult: (b: string) => void }) {

  const frameRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const handleResultRef = useRef(handleResult);
  const [status, setStatus] = useState(true);
  const [cameraAccess, setCameraAccess] = useState(false);
  const [barcodeDetectorSupported, setBarcodeDetectorSupported] = useState(true);
  const [cameraError, setCameraError] = useState<string | null>(null);
  const [cameraRetry, setCameraRetry] = useState(0);

  const stopStream = useCallback(() => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach(track => track.stop());
      streamRef.current = null;
    }
  }, []);

  useEffect(() => {
    if( !isBarcodeDetectorAvailable() )
      setBarcodeDetectorSupported(false);
  }, []);

  useEffect(() => {
    handleResultRef.current = handleResult;
  }, [handleResult]);

  useEffect(() => {
    let cancelled = false;
    let detectionInterval: ReturnType<typeof setInterval> | undefined;

    const startCamera = async () => {
      if (!status) {
        stopStream();
        return;
      }

      setCameraError(null);
      if (typeof window === 'undefined' || !window.isSecureContext) {
        setCameraAccess(false);
        setCameraError('Camera access requires HTTPS, or http://localhost on this device.');
        return;
      }
      if (!navigator.mediaDevices?.getUserMedia) {
        setCameraAccess(false);
        setCameraError('This browser does not support camera access. Try a current version of Chrome or Safari.');
        return;
      }

      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          audio: false,
          video: {
            facingMode: { ideal: 'environment' },
            width: { ideal: 1280 },
            height: { ideal: 720 },
          },
        });
        if (cancelled) {
          stream.getTracks().forEach(track => track.stop());
          return;
        }

        const video = videoRef.current;
        if (!video) {
          stream.getTracks().forEach(track => track.stop());
          return;
        }

        streamRef.current = stream;
        video.srcObject = stream;
        await video.play();
        if (cancelled) {
          stopStream();
          return;
        }

        setCameraAccess(true);

        if (isBarcodeDetectorAvailable()) {
          const barcodeDetector = new (window as any).BarcodeDetector({
            formats: ['upc_a', 'ean_8', 'ean_13']
          });

          detectionInterval = setInterval(async () => {
            const currentVideo = videoRef.current;
            if (!currentVideo || currentVideo.readyState < HTMLMediaElement.HAVE_CURRENT_DATA)
              return;

            try {
              const barcodes = await barcodeDetector.detect(currentVideo);
              if (cancelled || barcodes.length === 0)
                return;

              if (detectionInterval)
                clearInterval(detectionInterval);

              const canvas = canvasRef.current;
              const ctx = canvas?.getContext("2d");
              if (canvas && ctx) {
                const { videoWidth, videoHeight } = currentVideo;
                canvas.width = videoWidth;
                canvas.height = videoHeight;
                ctx.clearRect(0, 0, videoWidth, videoHeight);
                ctx.drawImage(currentVideo, 0, 0, videoWidth, videoHeight);

                const points = barcodes[0].cornerPoints;
                if (points?.length) {
                  ctx.beginPath();
                  ctx.lineWidth = 3;
                  ctx.strokeStyle = "red";
                  ctx.moveTo(points[0].x, points[0].y);
                  points.slice(1).forEach((point: { x: number; y: number }) => ctx.lineTo(point.x, point.y));
                  ctx.closePath();
                  ctx.stroke();
                }
              }

              handleResultRef.current(barcodes[0].rawValue);
              setStatus(false);
            } catch (error) {
              console.error('Barcode detection failed:', error);
            }
          }, 500);
        }
      } catch (error) {
        stopStream();
        setCameraAccess(false);
        console.error('Error accessing camera:', error);
        if (error instanceof DOMException && error.name === 'NotAllowedError') {
          setCameraError('Camera permission was denied. Allow camera access for this site in your browser settings, then try again.');
        } else if (error instanceof DOMException && error.name === 'NotFoundError') {
          setCameraError('No camera was found on this device.');
        } else if (error instanceof DOMException && error.name === 'NotReadableError') {
          setCameraError('The camera is already being used by another app. Close it and try again.');
        } else {
          setCameraError('Could not start the camera. Check browser permissions and try again.');
        }
      }
    };

    void startCamera();
    return () => {
      cancelled = true;
      if (detectionInterval)
        clearInterval(detectionInterval);
      stopStream();
    };
  }, [status, cameraRetry, stopStream]);


  return (
    <div ref={frameRef} className="relative w-full aspect-square border rounded-2xl my-4 overflow-hidden">
      <video className="w-full h-full object-cover" ref={videoRef} autoPlay playsInline muted>
        Your browser does not support the video tag.
      </video>
      <canvas id="myCanvas" ref={canvasRef} className="absolute top-0 left-0" width={200} height={300}></canvas>
      {!status && <FontAwesomeIcon icon={faClose} className='absolute top-0 right-0 m-4 text-2xl text-white cursor-pointer' onClick={()=>setStatus(true)} />}
      {!cameraAccess &&
        <div className="absolute top-0 left-0 w-full h-full bg-opacity-60 bg-black flex flex-col justify-center items-center p-3 text-center">
          <p>{cameraError || 'Requesting camera access...'}</p>
          {cameraError && <button className="mt-3 underline" onClick={()=>setCameraRetry(retry => retry + 1)}>Try again</button>}
        </div>
      }
      {cameraAccess && !barcodeDetectorSupported &&
        <div className="absolute top-0 left-0 w-full h-full bg-opacity-60 bg-black flex flex-col justify-center items-center p-3 text-center">
          <p>
            <a href="https://developer.mozilla.org/en-US/docs/Web/API/Barcode_Detection_API"><u>Barcode Detector API</u></a> is not supported by your <a href="https://caniuse.com/mdn-api_barcodedetector"><u>browsers</u></a>!
          </p>
          <p>Please open this page in your mobile browser (Chrome or Opera).</p>
        </div>
      }
    </div>
  )
}

function isBarcodeDetectorAvailable(){
  return (typeof window !== 'undefined' && "BarcodeDetector" in window);
};
