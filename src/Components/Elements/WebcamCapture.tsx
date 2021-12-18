import {FC, LegacyRef, memo, useCallback, useRef} from 'react'
import Webcam from 'react-webcam';

const videoConstraints = {
  width: 1280,
  height: 720,
  facingMode: "user"
};

/**
 * webカメラを起動
 * @param なし
 */
const WebcamCapture: FC = memo((setImageSrc) => {
  const webcamRef: LegacyRef<Webcam> = useRef(null);

  // todo setStateを上のコンポーネントへ移動し、set関数を引数にする
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