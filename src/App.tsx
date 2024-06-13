import DemoChart from './components/DemoChart';
import Filter from './components/Filter';

function App() {
    return (
        <div className="w-full">
            <div className="grid grid-cols-12 gap-2">
                <DemoChart />
                <Filter />
            </div>
        </div>
    );
}

export default App;
