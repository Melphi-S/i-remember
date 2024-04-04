/// <reference types="vite-plugin-svgr/client" />
import styles from "./AudioButton.module.scss";
import Spinner, { SpinnerTypes } from "../Spinner/Spinner.tsx";
import { FC, useEffect, useState } from "react";
import AudioIcon from "../../../assets/icons/audio.svg?react";
import NoAudioIcon from "../../../assets/icons/no-audio.svg?react";
import { AudioButtonSizes } from "./types";
import classnames from "classnames";

interface AudioButtonProps {
  voice: string | undefined;
  size?: AudioButtonSizes;
  useTheme?: boolean;
}

const AudioButton: FC<AudioButtonProps> = ({
  voice,
  size = AudioButtonSizes.COMMON,
  useTheme = false,
}) => {
  const [audio, setAudio] = useState<HTMLAudioElement | null>(null);

  useEffect(() => {
    if (voice) {
      const audio = new Audio(voice);
      const setLoadedAudio = () => setAudio(audio);
      audio.addEventListener("canplaythrough", setLoadedAudio, false);

      return () => audio.removeEventListener("canplaythrough", setLoadedAudio);
    }
  }, [voice]);

  const playAudio = async () => {
    try {
      await audio?.play();
    } catch (err) {
      console.log("Failed to play..." + err);
    }
  };
  const audioIconClass = classnames({
    [styles.iconColor]: useTheme,
    [styles[size]]: true,
  });

  const noAudioIconClass = classnames({
    [styles.iconColor]: useTheme,
    [styles.noAudioIcon]: true,
    [styles[size]]: true,
  });

  return (
    <div className={styles.audioContainer}>
      {!voice && <NoAudioIcon className={noAudioIconClass} />}
      {voice && !audio && (
        <Spinner
          type={
            size === AudioButtonSizes.COMMON
              ? SpinnerTypes.AUDIO
              : SpinnerTypes.COMMON
          }
        />
      )}
      {voice && audio && (
        <button className={styles.button} onClick={playAudio}>
          <AudioIcon className={audioIconClass}/>
        </button>
      )}
    </div>
  );
};

export default AudioButton;
