import {FC, LegacyRef, memo, useCallback, useRef} from 'react'
import Webcam from 'react-webcam';

const videoConstraints = {
  width: 1280,
  height: 720,
  facingMode: "user"
};

//Propsの型定義
type PropsType = {
  
}

const WebcamCapture: FC<PropsType> = memo(() => {
  const webcamRef: LegacyRef<Webcam> = useRef(null);


  const capture = useCallback(
    () => {
      const imageSrc = webcamRef.current?.getScreenshot();
      console.log(imageSrc);
    },
    [webcamRef],
  )
  
  return (
    <>
      <Webcam
        audio={false}
        height={720}
        ref={webcamRef}
        screenshotFormat="image/jpeg"
        width={1280}
        videoConstraints={videoConstraints}
      />
      <button onClick={capture}>Capture photo</button>
    </>
  );

})

WebcamCapture.displayName = 'WebcamCapture'
export default WebcamCapture