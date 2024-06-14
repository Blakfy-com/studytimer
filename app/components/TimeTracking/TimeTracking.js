import { useSelector } from "react-redux";

export default function TimeTracking() {

    const { data } = useSelector((state) => state.dataAnalysis);
    const { settings } = useSelector((state) => state.timerSetting);

    function timeSpent() {
        const pomo = settings.pomodoroTime;
        const short = settings.shortBreakTime;
        const long = settings.longBreakTime;
        const longInterval = settings.longBreakInterval;

        const totalSessions = data.reduce((total, session) => total + session.totalSessions, 0);
        const currentSession = data.reduce((total, session) => total + session.currentSession, 0);
        const session = totalSessions - currentSession;

        const newPomo = session * pomo; // 720
        const newLong = ((session / longInterval) * long) - long; // 30
        const newShort = ((session - (session / longInterval))) * short; // 120

        const date = new Date();
        const endTime = new Date(date.getTime() + (newPomo + newShort + newLong) * 60000); // Convert minutes to milliseconds

        return endTime.toLocaleTimeString();
    }

    return (
        <section className="mt-10 h-20 flex justify-around items-center border text-white rounded-md">
            <div className="flex items-end ">
                <p className="text-md opacity-80">Pomos: </p>
                <p className="pl-3 text-2xl opacity-90">
                    {data.reduce((total, session) => total + session.currentSession, 0)} / {data.reduce((total, session) => total + session.totalSessions, 0)}</p>
            </div>
            <div className="flex items-end">
                <p className="text-md opacity-80">Time Spent: </p>
                <p className="px-1 text-2xl opacity-90">{timeSpent()}</p>
            </div>
        </section>
    );
}