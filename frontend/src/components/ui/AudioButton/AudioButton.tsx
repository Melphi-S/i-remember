import styles from "./AudioButton.module.scss";
import Spinner, { SpinnerTypes } from "../Spinner/Spinner.tsx";
import React, { FC, useState } from "react";
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
  const [isLoading, setIsLoading] = useState(false);

  const playAudio = async (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
  ) => {
    e.stopPropagation();

    try {
      if (!audio) {
        setIsLoading(true);
        const audio = new Audio(voice);
        const setLoadedAudio = () => setAudio(audio);
        audio.addEventListener("canplaythrough", setLoadedAudio, false);
        audio.oncanplaythrough = async () => {
          setIsLoading(false);
          await audio?.play();
        };
      } else {
        await audio?.play();
      }
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

  if (!voice) {
    return <NoAudioIcon className={noAudioIconClass} />;
  }

  if (voice && isLoading) {
    return (
      <Spinner
        type={
          size === AudioButtonSizes.COMMON
            ? SpinnerTypes.AUDIO
            : SpinnerTypes.COMMON
        }
      />
    );
  }

  return (
    <button
      className={styles.button}
      onClick={(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) =>
        playAudio(e)
      }
    >
      <AudioIcon className={audioIconClass} />
    </button>
  );
};

export default AudioButton;
