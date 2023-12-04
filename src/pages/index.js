import styles from '../styles/Home.module.css'
import {Inter} from "next/font/google";
import {useRouter} from "next/router";


const interFont = Inter({subsets: ['latin']})

export default function Home() {
    const router = useRouter();

    return <main className={styles.main} style={interFont.style}>
        <nav></nav>
        <h1 className={styles.header1}>Auto Time Box</h1>
        <h2 className={styles.header2}>The easiest way to organize what you need to get done today</h2>

        <div className={styles.buttonArea}>
            <button className={styles.button}
                    onClick={() => router.push("/entry")}
            >Click here to start!
            </button>
            <button className={styles.button}
                    onClick={() => router.push("/cal-view")}
            >View Calendar
            </button>
        </div>
    </main>
}
