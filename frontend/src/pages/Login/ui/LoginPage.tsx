import styles from "./LoginPage.module.scss";
import Input from "../../../components/ui/Input/Input.tsx";
import Button from "../../../components/ui/Button/Button.tsx";
import {TypeAnimation} from "react-type-animation";

const a = 'Hello, friend!';
const b = 'Please, sign in to use the app.'
const c = 'No account? Sign up soon!'

const LoginPage = () => {
  return (
    <main className={styles.page}>
        <TypeAnimation
            sequence={[
                `${a}\n${b}\n \n${c}`,
                1000,
                '',
            ].reduce((acc: (string | number)[], curr) => {
                if (typeof curr === "string") {
                    const lastString = acc.filter((item) => typeof item === "string").pop() || "";
                    acc.push((lastString + " " + curr).trim());
                } else {
                    acc.push(curr);
                }
                return acc;
            }, [])}
            wrapper="span"
            speed={20}
            style={{ whiteSpace: 'pre-line', fontSize: '60px', lineHeight: '72px', height: '300px', marginLeft: '200px'}}
            repeat={0}
            deletion-speed={0}
        />
      <form className={styles.form}>
        <Input placeholder={"email"} />
        <Input placeholder={"password"} />
          <Button>Sign in</Button>
      </form>
    </main>
  );
};

export default LoginPage;
