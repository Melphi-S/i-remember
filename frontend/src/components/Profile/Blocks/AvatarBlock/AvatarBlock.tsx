import styles from "./AvatarBlock.module.scss";
import { useAppSelector } from "../../../../store/store.ts";
import { useEffect, useState } from "react";
import { FetchResult } from "../../types";
import { userApi } from "../../../../api/services/UserService.ts";
import ProfileBlock from "../../../ProfileBlock/ProfileBlock.tsx";
import Select, { Option } from "../../../ui/Select/Select.tsx";
import { HexColorPicker } from "react-colorful";
import { useTranslation } from "react-i18next";
import { AVATAR_URL } from "../../../../utils/variables.ts";

const eyes: Option[] = [
  { value: "closed", label: "closed" },
  { value: "closed2", label: "closed2" },
  { value: "crying", label: "crying" },
  { value: "cute", label: "cute" },
  { value: "glasses", label: "glasses" },
  { value: "love", label: "love" },
  { value: "pissed", label: "pissed" },
  { value: "plain", label: "plain" },
  { value: "shades", label: "shades" },
  { value: "sad", label: "sad" },
  { value: "sleepClose", label: "sleepClose" },
  { value: "stars", label: "stars" },
  { value: "tearDrop", label: "tearDrop" },
  { value: "wink", label: "wink" },
  { value: "wink2", label: "wink2" },
];

const mouth: Option[] = [
  { value: "cute", label: "cute" },
  { value: "drip", label: "drip" },
  { value: "faceMask", label: "faceMask" },
  { value: "kissHeart", label: "kissHeart" },
  { value: "lilSmile", label: "lilSmile" },
  { value: "pissed", label: "pissed" },
  { value: "plain", label: "plain" },
  { value: "sad", label: "sad" },
  { value: "shout", label: "shout" },
  { value: "shy", label: "shy" },
  { value: "sick", label: "sick" },
  { value: "smileLol", label: "smileLol" },
  { value: "smileTeeth", label: "smileTeeth" },
  { value: "tongueOut", label: "tongueOut" },
  { value: "wideSmile", label: "wideSmile" },
];

const AvatarBlock = () => {
  const { user } = useAppSelector((state) => state.user);

  const initialUrl = new URL(user?.avatar as string);

  const [newAvatar, setNewAvatar] = useState(user?.avatar as string);

  const [avatarColor, setAvatarColor] = useState<string | undefined>(
    initialUrl.searchParams.get("backgroundColor") as string,
  );

  const [avatarEyes, setAvatarEyes] = useState<Option | null>({
    value: initialUrl.searchParams.get("eyes") as string,
    label: initialUrl.searchParams.get("eyes") as string,
  });
  const [avatarMouth, setAvatarMouth] = useState<Option | null>({
    value: initialUrl.searchParams.get("mouth") as string,
    label: initialUrl.searchParams.get("mouth") as string,
  });

  const [fetchResult, setFetchResult] = useState<FetchResult | null>(null);

  const [patch, { isLoading }] = userApi.usePatchMutation();

  useEffect(() => {
    setNewAvatar(
      `${AVATAR_URL}?backgroundColor=${avatarColor}&eyes=${avatarEyes?.value}&mouth=${avatarMouth?.value}`,
    );
  }, [avatarColor, avatarEyes, avatarMouth]);

  const { t } = useTranslation();

  const onSubmit = async (avatar: string) => {
    const result = await patch({ avatar });

    if ("error" in result) {
      setFetchResult(FetchResult.ERROR);
      await new Promise((res) => setTimeout(res, 2000));
      setFetchResult(null);
    } else {
      setFetchResult(FetchResult.SUCCESS);
      await new Promise((res) => setTimeout(res, 2000));
      setFetchResult(null);
    }
  };

  return (
    <ProfileBlock
      title={t("change avatar")}
      onSubmit={() => onSubmit(newAvatar)}
      fetchError={fetchResult === FetchResult.ERROR}
      fetchSuccess={fetchResult === FetchResult.SUCCESS}
      isLoading={isLoading}
      isPrevValue={newAvatar === user?.avatar}
      onCancel={() => {
        setNewAvatar(user?.avatar as string);
        setAvatarColor(
          initialUrl.searchParams.get("backgroundColor") as string,
        );
        setAvatarEyes({
          value: initialUrl.searchParams.get("eyes") as string,
          label: initialUrl.searchParams.get("eyes") as string,
        });
        setAvatarMouth({
          value: initialUrl.searchParams.get("mouth") as string,
          label: initialUrl.searchParams.get("mouth") as string,
        });
      }}
      isValid={true}
    >
      <form className={styles.form}>
        <div className={styles.imageWrapper}>
          <img className={styles.avatar} src={newAvatar} alt={t("avatar")} />
        </div>
        <div className={styles.selectWrapper}>
          <Select
            options={eyes}
            title={t("avatar eyes")}
            selectedOption={avatarEyes}
            setSelectedOption={setAvatarEyes}
          />
          <Select
            options={mouth}
            title={t("avatar mouth")}
            selectedOption={avatarMouth}
            setSelectedOption={setAvatarMouth}
          />
        </div>
        <div className={styles.hexWrapper}>
          <span className={styles.hexTitle}>{t("avatar color")}</span>
          <HexColorPicker
            color={avatarColor}
            onChange={(e) => setAvatarColor(e.slice(1))}
            className={styles.hexPicker}
          />
        </div>
      </form>
    </ProfileBlock>
  );
};

export default AvatarBlock;
