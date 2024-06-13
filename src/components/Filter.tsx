import { useEffect, useState } from 'react';

function Filter() {
    // State for storing filter option - by default
    const [retailer, setRetailer] = useState<String[]>([]);
    const [distributor, setDistributor] = useState<String[]>([]);
    const [market, setMarket] = useState('residental');
    const [usage, setUsage] = useState('all-usage');

    // State for disable filter option
    const [isControlledLoadDisable, setIsControlledLoadDisable] = useState(false);
    const [checked, setChecked] = useState(false);

    useEffect(() => {
        // Get Distributor
        setTimeout(() => {
            handleGetDistributor();
        }, 500);

        // Get Retailer
        setTimeout(() => {
            handleGetRetailer();
        }, 500);
    }, [retailer, distributor]);

    // onChange for retailer
    const handleSelectRetailer = (selectedRetailer: string) => {
        setRetailer((prev) => {
            if (prev.includes(selectedRetailer)) {
                return prev.filter((retailer) => retailer != selectedRetailer);
            } else {
                return [...prev, selectedRetailer];
            }
        });
    };

    const handleGetDistributor = async () => {
        console.log(retailer);
    };

    // onChange for distributor
    const handleSelectDistributor = (selectedDistributor: string) => {
        setDistributor((prev) => {
            if (prev.includes(selectedDistributor)) {
                return prev.filter((distributor) => distributor != selectedDistributor);
            } else {
                return [...prev, selectedDistributor];
            }
        });
    };

    const handleGetRetailer = async () => {
        console.log(distributor);
    };

    // onChange for market
    const handleSelectMarket = (e: any) => {
        setMarket(e.target.value);

        if (e.target.value == 'small-business') {
            setIsControlledLoadDisable(true);
            setChecked(false);
        } else {
            setIsControlledLoadDisable(false);
        }
    };

    // onChange for Controlled Load
    const handleSelectControlledLoad = (e: any) => {
        console.log(e.target.value);
        setChecked((prevChecked) => !prevChecked);
    };

    // onChange for Demand
    const handleSelectDemand = (e: any) => {
        console.log(e.target.value);
    };

    // onChange for Usage
    const handleSelectUsage = (e: any) => {
        setUsage(e.target.value);
    };

    // onClick for get chart
    const handleGetChart = (e: any) => {
        e.preventDefault();
        console.log(retailer);
        console.log(distributor);
        console.log(market);
        console.log(usage);
    };

    return (
        <div className="col-span-3 py-2 px-6 overflow-hidden">
            <h3 className="py-4 text-lg font-bold">Filter</h3>
            <div className="flex flex-col">
                <div className="mb-[10px]">
                    <span className="block font-semibold mb-2">Showing</span>
                    <div className="flex items-center">
                        <input type="radio" name="radio-2" className="radio radio-primary w-[14px] h-[14px] mr-2" />
                        <label className="mr-4">Lowest Price Plan</label>
                        <input type="radio" name="radio-2" className="radio radio-primary w-[14px] h-[14px] mr-2" />
                        <label>All</label>
                    </div>
                </div>
                <div className="mb-[10px]">
                    <span className="block font-semibold mb-2">From</span>
                    <div className="flex items-center">
                        <div className="dropdown w-full">
                            <div tabIndex={0} role="button" className="btn w-full justify-start">
                                Choose Retailer
                            </div>
                            <ul
                                tabIndex={0}
                                className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-full"
                            >
                                <li>
                                    <label className="label cursor-pointer">
                                        <span className="label-text">First Retailer</span>
                                        <input
                                            type="checkbox"
                                            name="first-retailer"
                                            onChange={() => handleSelectRetailer('first-retailer')}
                                            className="checkbox checkbox-primary"
                                        />
                                    </label>
                                </li>
                                <li>
                                    <label className="label cursor-pointer">
                                        <span className="label-text">Second Retailer</span>
                                        <input
                                            type="checkbox"
                                            name="second-retailer"
                                            onChange={() => handleSelectRetailer('second-retailer')}
                                            className="checkbox checkbox-primary"
                                        />
                                    </label>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
                <div className="mb-[10px]">
                    <span className="block font-semibold mb-2">Effective</span>
                    <div className="flex items-center">
                        <input
                            type="date"
                            name="effective-day"
                            className=" border-2 p-2 outline-none rounded border-[#333]/[0.1]"
                        />
                    </div>
                </div>
                <div className="mb-[10px]">
                    <span className="block font-semibold mb-2">Distributor</span>
                    <div className="flex items-center">
                        <div className="dropdown w-full">
                            <div tabIndex={0} role="button" className="btn w-full justify-start">
                                Choose Distributor
                            </div>
                            <ul
                                tabIndex={0}
                                className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-full"
                            >
                                <li>
                                    <label className="label cursor-pointer">
                                        <span className="label-text">First Distributor</span>
                                        <input
                                            type="checkbox"
                                            name="first-distributor"
                                            onChange={() => handleSelectDistributor('first-distributor')}
                                            className="checkbox checkbox-primary"
                                        />
                                    </label>
                                </li>
                                <li>
                                    <label className="label cursor-pointer">
                                        <span className="label-text">Second Distributor</span>
                                        <input
                                            type="checkbox"
                                            name="second-distributor"
                                            onChange={() => handleSelectDistributor('second-distributor')}
                                            className="checkbox checkbox-primary"
                                        />
                                    </label>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
                <div className="mb-[10px]">
                    <span className="block font-semibold mb-2">Market</span>
                    <div className="flex items-center">
                        <input
                            type="radio"
                            name="radio-market"
                            value="residental"
                            onChange={handleSelectMarket}
                            className="radio w-[14px] h-[14px] radio-primary mr-2"
                        />
                        <label className="mr-4">Residental</label>
                        <input
                            type="radio"
                            name="radio-market"
                            value="small-business"
                            onChange={handleSelectMarket}
                            className="radio w-[14px] h-[14px] radio-primary mr-2"
                        />
                        <label>Small Business</label>
                    </div>
                </div>
                <div className="mb-[10px]">
                    <span className="block font-semibold mb-2">Tariff Type</span>
                    <div className="flex items-center">
                        <input
                            type="radio"
                            name="radio-tariff"
                            value="single-rate"
                            onChange={handleSelectMarket}
                            className="radio w-[14px] h-[14px] radio-primary mr-2"
                        />
                        <label className="mr-4">Single Rate</label>
                        <input
                            type="radio"
                            name="radio-tariff"
                            value="time-of-use"
                            onChange={handleSelectMarket}
                            className="radio w-[14px] h-[14px] radio-primary mr-2"
                        />
                        <label>Time of Use</label>
                    </div>
                </div>
                <div className={`mb-[10px] transition-all duration-300 ${isControlledLoadDisable && 'opacity-50'}`}>
                    <div className="form-control w-52">
                        <label className="cursor-pointer label">
                            <span className="label-text">Controlled Load</span>
                            <input
                                type="checkbox"
                                name="controlled-load"
                                onChange={handleSelectControlledLoad}
                                className="toggle toggle-primary"
                                checked={!isControlledLoadDisable && checked}
                                disabled={isControlledLoadDisable}
                            />
                        </label>
                    </div>
                </div>
                <div className="mb-[10px] opacity-50">
                    <div className="form-control w-52">
                        <label className="cursor-pointer label">
                            <span className="label-text">Demand</span>
                            <input
                                type="checkbox"
                                name="demand"
                                checked={false}
                                disabled
                                onChange={handleSelectDemand}
                                className="toggle toggle-primary"
                            />
                        </label>
                    </div>
                </div>
                <div className="mb-[10px]">
                    <span className="block font-semibold mb-2">Usage</span>
                    <div className="flex items-center w-full">
                        <select
                            value={usage}
                            onChange={handleSelectUsage}
                            className="select w-full border-2 p-2 outline-none rounded border-[#333]/[0.1]"
                        >
                            <option value="all-usage">All Usage</option>
                            <option value="first-usage">First Usage</option>
                            <option value="second-usage">Second Usage</option>
                        </select>
                    </div>
                </div>
                <button onClick={handleGetChart} className="btn btn-primary">
                    Search
                </button>
            </div>
        </div>
    );
}

export default Filter;
