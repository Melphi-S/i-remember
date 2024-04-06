import styles from './Statistics.module.scss';
import Statistics from "../../../components/Statistics/Statistics.tsx";

const StatisticsPage = () => {
    return (
        <main className={styles.page}>
            <Statistics/>
        </main>
    );
};

export default StatisticsPage;