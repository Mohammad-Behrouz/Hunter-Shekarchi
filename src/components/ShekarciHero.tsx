"use client";

import { useEffect, useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import back_address from "../javascript/back_address"
import Modal, { ModalBody, ModalHeader } from "./Modal/Modal";

export default function ShekarciHero() {
    const [isAnalyzing, setIsAnalyzing] = useState(false);
    const [showResult, setShowResult] = useState(false);

    // --- API Results State ---
    const [predictedPrice, setPredictedPrice] = useState<number | null>(null);
    const [apiError, setApiError] = useState<string | null>(null);

    // --- States for Car Selection ---
    const [cars, setCars] = useState<any[]>([]);
    const [isCarModalOpen, setIsCarModalOpen] = useState(false);
    const [selectedCar, setSelectedCar] = useState<any>(null);
    const [searchTerm, setSearchTerm] = useState("");
    const [activeParent, setActiveParent] = useState<any | null>(null);

    // --- States for Year Selection ---
    const [isYearModalOpen, setIsYearModalOpen] = useState(false);
    const [selectedYear, setSelectedYear] = useState<number | null>(null);

    // --- States for Mileage ---
    const [mileage, setMileage] = useState<number | "">("");

    // --- States for Body Condition ---
    const [isBodyModalOpen, setIsBodyModalOpen] = useState(false);
    const [selectedBody, setSelectedBody] = useState<string | null>(null);
    const bodyOptions = ["بدنه سالم", "دوررنگ", "تمام‌رنگ", "تصادفی"];

    // --- States for Technical Condition (Engine & Chassis) ---
    const [isTechModalOpen, setIsTechModalOpen] = useState(false);
    const [selectedEngine, setSelectedEngine] = useState<string | null>(null);
    const [selectedChassis, setSelectedChassis] = useState<string | null>(null);
    const techOptions = ["سالم", "آسیب‌دیده"];

    // محاسبه سال‌های موجود برای ماشین انتخاب شده
    const availableYears = useMemo(() => {
        if (!selectedCar || !selectedCar.startYear || !selectedCar.endYear) return [];
        let years = [];
        for (let y = selectedCar.endYear; y >= selectedCar.startYear; y--) {
            years.push(y);
        }
        return years;
    }, [selectedCar]);

    const flatCars = useMemo(() => {
        let list: any[] = [];
        cars.forEach(parent => {
            if (parent.children?.length > 0) {
                parent.children.forEach((child: any) => {
                    list.push({ ...child, parentLabel: `${parent.brand} ${parent.model}` });
                });
            } else {
                list.push(parent);
            }
        });
        return list;
    }, [cars]);

    const filteredCars = useMemo(() => {
        if (!searchTerm) return null;
        return flatCars.filter(car =>
            `${car.brand} ${car.model} ${car.trim}`.toLowerCase().includes(searchTerm.toLowerCase())
        );
    }, [searchTerm, flatCars]);

    useEffect(() => {
        const fetchCars = async () => {
            try {
                const res = await fetch(`${back_address()}api/ML/cars`);
                const json = await res.json();
                setCars(json.data || []);
            } catch (err) {
                console.error("خطا در دریافت لیست خودروها", err);
            }
        };
        fetchCars();
    }, []);

    // هندلر انتخاب ماشین (بستن مودال ماشین و باز کردن مودال سال)
    const handleCarSelect = (car: any) => {
        setSelectedCar(car);
        setSelectedYear(null);
        setIsCarModalOpen(false);
        setIsYearModalOpen(true);
    };

    // --- Submit Handler for Prediction API ---
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        // Validation
        if (!selectedCar || !selectedYear || !selectedBody || !selectedEngine || !selectedChassis) {
            setApiError("لطفا تمامی فیلدها را پر کنید.");
            setShowResult(true);
            return;
        }

        setShowResult(false);
        setApiError(null);
        setIsAnalyzing(true);

        try {
            // ساختار مسطح (Flat) دقیقاً مطابق با مدل CarAdData و Swagger
            const payload = {
                carCatalogId: String(selectedCar?.id),
                productionYear: Number(selectedYear),
                mileage: Number(mileage),
                bodyStatus: selectedBody,
                chassisStatus: selectedChassis,
                motorStatus: selectedEngine
                // فیلد price طبق دستور شما ارسال نمی‌شود
            };

            // ارسال درخواست
            const response = await fetch(`${back_address()}/api/ML/predict`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(payload),
            });

            if (!response.ok) {
                // اگر ارور 400 بدهد، می‌توانید لاگ بگیرید تا جزئیات ارور را ببینید
                const errorData = await response.json().catch(() => null);
                console.error("Server Error Details:", errorData);
                throw new Error("Network response was not ok");
            }

            const data = await response.json();

            // با توجه به خروجی‌ها بررسی کنید که آیا API مقدار پیش‌بینی شده را مستقیماً داخل data.predictedPrice_MillionTomans برمی‌گرداند یا خیر
            if (data.predictedPrice_MillionTomans) {
                setPredictedPrice(data.predictedPrice_MillionTomans);
            } else if (data.score) {
                // نکته: در کلاس CarPricePrediction اسم ستون Score است، 
                // ممکن است خروجی بک‌اند با کلید score یا predictedPrice برگردد.
                setPredictedPrice(data.score);
            } else {
                throw new Error("Invalid response format");
            }

        } catch (error) {
            console.error("Prediction Error:", error);
            setApiError("ارتباط با هوش مصنوعی برقرار نشد. لطفا دوباره تلاش کنید.");
        } finally {
            setIsAnalyzing(false);
            setShowResult(true);
        }
    };


    // Helper for formatting price (Million Tomans to full Tomans)
    const formatPrice = (millionTomans: number) => {
        return (millionTomans * 1000000).toLocaleString('fa-IR');
    };

    return (
        <section className="relative w-full min-h-screen bg-zinc-950 overflow-hidden text-white flex flex-col items-center justify-center px-6 pt-20">

            {/* Background Effects */}
            <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
                <motion.div animate={{ x: [0, 50, -30, 0], y: [0, -40, 20, 0], scale: [1, 1.1, 0.9, 1] }} transition={{ duration: 20, repeat: Infinity, ease: "linear" }} className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] bg-indigo-600/20 rounded-full blur-[120px]" />
                <motion.div animate={{ x: [0, -40, 30, 0], y: [0, 50, -20, 0], scale: [1, 0.9, 1.1, 1] }} transition={{ duration: 25, repeat: Infinity, ease: "linear" }} className="absolute bottom-[-10%] right-[-10%] w-[600px] h-[600px] bg-emerald-500/10 rounded-full blur-[150px]" />
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-transparent via-zinc-950/80 to-zinc-950 z-0"></div>
            </div>

            {/* Hero Content */}
            <div className="relative z-10 max-w-4xl w-full flex flex-col items-center text-center">
                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
                    <div className="inline-flex items-center gap-2 px-3 py-1 mb-6 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-sm font-medium">
                        <span className="relative flex h-2 w-2">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-2 w-2 bg-indigo-500"></span>
                        </span>
                        موتور هوش مصنوعی فعال است
                    </div>
                    <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight mb-6">
                        شکار <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-emerald-600">قیمت واقعی</span> خودرو
                    </h1>
                    <p className="text-lg md:text-xl text-zinc-400 max-w-2xl mx-auto mb-10">
                        مانند یک تریدر حرفه‌ای در بازار خودرو عمل کنید. مدل و وضعیت ماشین را وارد کنید تا هوش مصنوعی ارزش واقعی آن را در لحظه تخمین بزند.
                    </p>
                </motion.div>

                {/* Form */}
                <motion.form initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.2 }} onSubmit={handleSubmit} className="w-full max-w-3xl bg-white/[0.02] border border-white/10 backdrop-blur-md rounded-2xl p-6 md:p-8 shadow-2xl">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">

                        {/* فیلد مدل و سال خودرو */}
                        <div className="flex flex-col text-right">
                            <label className="text-xs text-zinc-400 mb-2 px-1">مدل و سال خودرو</label>
                            <button type="button" onClick={() => setIsCarModalOpen(true)} className="w-full bg-zinc-900/50 border border-zinc-700/50 text-zinc-200 text-sm rounded-xl px-4 py-3 text-right focus:outline-none focus:ring-2 focus:ring-indigo-500/50 hover:border-indigo-500/50 transition-all cursor-pointer truncate">
                                {selectedCar
                                    ? `${selectedCar.brand} ${selectedCar.model} ${selectedCar.trim || ""} ${selectedYear ? `(${selectedYear})` : ""}`
                                    : "انتخاب کنید..."}
                            </button>
                        </div>

                        {/* فیلد کارکرد */}
                        <div className="flex flex-col text-right">
                            <label className="text-xs text-zinc-400 mb-2 px-1">کارکرد (کیلومتر)</label>
                            <input
                                type="number"
                                value={mileage}
                                onChange={(e) => setMileage(e.target.value ? Number(e.target.value) : "")}
                                placeholder="مثلا 50000"
                                className="w-full bg-zinc-900/50 border border-zinc-700/50 text-zinc-200 text-sm rounded-xl px-4 py-3 text-right focus:outline-none focus:ring-2 focus:ring-indigo-500/50 hover:border-indigo-500/50 transition-all" dir="rtl"
                            />
                        </div>

                        {/* فیلد وضعیت بدنه */}
                        <div className="flex flex-col text-right">
                            <label className="text-xs text-zinc-400 mb-2 px-1">وضعیت بدنه</label>
                            <button type="button" onClick={() => setIsBodyModalOpen(true)} className="w-full bg-zinc-900/50 border border-zinc-700/50 text-zinc-200 text-sm rounded-xl px-4 py-3 text-right focus:outline-none focus:ring-2 focus:ring-indigo-500/50 hover:border-indigo-500/50 transition-all cursor-pointer truncate">
                                {selectedBody ? selectedBody : "انتخاب کنید..."}
                            </button>
                        </div>

                        {/* فیلد وضعیت فنی */}
                        <div className="flex flex-col text-right">
                            <label className="text-xs text-zinc-400 mb-2 px-1">وضعیت فنی (موتور و شاسی)</label>
                            <button type="button" onClick={() => setIsTechModalOpen(true)} className="w-full bg-zinc-900/50 border border-zinc-700/50 text-zinc-200 text-sm rounded-xl px-4 py-3 text-right focus:outline-none focus:ring-2 focus:ring-indigo-500/50 hover:border-indigo-500/50 transition-all cursor-pointer truncate">
                                {(selectedEngine && selectedChassis)
                                    ? `موتور ${selectedEngine} / شاسی ${selectedChassis}`
                                    : "انتخاب کنید..."}
                            </button>
                        </div>
                    </div>

                    <button type="submit" disabled={isAnalyzing} className="w-full relative group overflow-hidden bg-indigo-600 hover:bg-indigo-500 text-white font-medium text-lg rounded-xl py-4 transition-all duration-300 disabled:opacity-70 disabled:cursor-not-allowed">
                        <span className="relative z-10 flex items-center justify-center gap-2">{isAnalyzing ? "در حال پردازش..." : "محاسبه ارزش واقعی"}</span>
                        <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out z-0"></div>
                    </button>
                </motion.form>

                {/* Inline Result Area */}
                <div className="w-full max-w-3xl mt-6 min-h-[120px]">
                    <AnimatePresence mode="wait">
                        {isAnalyzing && (
                            <motion.div key="loading" initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} exit={{ opacity: 0, height: 0 }} className="flex flex-col items-center justify-center py-8 text-indigo-400">
                                <div className="w-8 h-8 border-2 border-indigo-500/30 border-t-indigo-500 rounded-full animate-spin mb-4"></div>
                                <p className="text-sm font-medium animate-pulse">هوش مصنوعی در حال تحلیل داده‌های بازار...</p>
                            </motion.div>
                        )}

                        {showResult && apiError && (
                            <motion.div key="error" initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="bg-rose-500/10 border border-rose-500/30 backdrop-blur-md rounded-2xl p-6 flex flex-col items-center justify-center shadow-[0_0_30px_rgba(244,63,94,0.1)]">
                                <p className="text-rose-400 text-center font-medium">{apiError}</p>
                            </motion.div>
                        )}

                        {showResult && !apiError && predictedPrice && (
                            <motion.div key="result" initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="bg-emerald-500/10 border border-emerald-500/30 backdrop-blur-md rounded-2xl p-6 flex flex-col md:flex-row items-center justify-between shadow-[0_0_30px_rgba(16,185,129,0.1)]">
                                <div className="text-right mb-4 md:mb-0">
                                    <p className="text-zinc-400 text-sm mb-1">ارزش‌گذاری هوش مصنوعی شکارچی</p>
                                    <div className="flex items-baseline gap-2">
                                        <span className="text-4xl font-bold text-emerald-400">{formatPrice(predictedPrice)}</span>
                                        <span className="text-emerald-500/70 text-sm">تومان</span>
                                    </div>
                                </div>
                                <div className="flex flex-col gap-2">
                                    <div className="flex items-center justify-between gap-4 bg-zinc-900/50 px-4 py-2 rounded-lg border border-zinc-800">
                                        <span className="text-zinc-400 text-xs font-medium">وضعیت بازار:</span>
                                        <span className="text-zinc-300 text-sm">معاملات روان</span>
                                    </div>
                                    <div className="flex items-center justify-between gap-4 bg-emerald-500/20 px-4 py-2 rounded-lg border border-emerald-500/30">
                                        <span className="text-emerald-400 text-xs font-bold">دقت تخمین:</span>
                                        <span className="text-emerald-300 text-sm font-bold">بالای ۹۲٪</span>
                                    </div>
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </div>

            {/* ================= MODALS ================= */}

            {/* 1. مودال انتخاب خودرو */}
            <Modal isOpen={isCarModalOpen} onClose={() => { setIsCarModalOpen(false); setActiveParent(null); setSearchTerm(""); }}>
                <ModalHeader>انتخاب مدل خودرو</ModalHeader>
                <ModalBody>
                    <input type="text" placeholder="جستجوی خودرو..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} className="w-full mb-6 bg-zinc-900/50 border border-zinc-700/50 text-zinc-200 text-sm rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 text-right" dir="rtl" />
                    <div className="space-y-2 max-h-[50vh] overflow-y-auto pr-1 text-right" dir="rtl">
                        {searchTerm && filteredCars?.map(car => (
                            <div key={car.id} onClick={() => handleCarSelect(car)} className="p-3 rounded-xl bg-zinc-800/40 hover:bg-indigo-600/20 border border-zinc-700/30 cursor-pointer transition-all">
                                {car.brand} {car.model} {car.trim}
                            </div>
                        ))}
                        {!searchTerm && !activeParent && cars.map(parent => (
                            <div key={parent.id} onClick={() => { parent.children?.length > 0 ? setActiveParent(parent) : handleCarSelect(parent); }} className="p-3 rounded-xl bg-zinc-800/40 hover:bg-indigo-600/20 border border-zinc-700/30 cursor-pointer transition-all">
                                {parent.brand} {parent.model}
                            </div>
                        ))}
                        {!searchTerm && activeParent && (
                            <>
                                <button onClick={() => setActiveParent(null)} className="text-indigo-400 text-sm mb-3">← بازگشت</button>
                                {activeParent.children.map((child: any) => (
                                    <div key={child.id} onClick={() => handleCarSelect(child)} className="p-3 rounded-xl bg-zinc-800/40 hover:bg-emerald-600/20 border border-zinc-700/30 cursor-pointer transition-all">
                                        {child.trim} ({child.startYear} - {child.endYear})
                                    </div>
                                ))}
                            </>
                        )}
                    </div>
                </ModalBody>
            </Modal>

            {/* 2. مودال انتخاب سال تولید */}
            <Modal isOpen={isYearModalOpen} onClose={() => setIsYearModalOpen(false)}>
                <ModalHeader>انتخاب سال تولید</ModalHeader>
                <ModalBody>
                    <div className="grid grid-cols-3 gap-3 max-h-[50vh] overflow-y-auto pr-1 text-center" dir="rtl">
                        {availableYears.map(year => (
                            <div key={year} onClick={() => { setSelectedYear(year); setIsYearModalOpen(false); }} className="p-3 rounded-xl bg-zinc-800/40 hover:bg-indigo-600/20 border border-zinc-700/30 cursor-pointer transition-all font-medium">
                                {year}
                            </div>
                        ))}
                    </div>
                </ModalBody>
            </Modal>

            {/* 3. مودال وضعیت بدنه */}
            <Modal isOpen={isBodyModalOpen} onClose={() => setIsBodyModalOpen(false)}>
                <ModalHeader>انتخاب وضعیت بدنه</ModalHeader>
                <ModalBody>
                    <div className="space-y-3 text-right" dir="rtl">
                        {bodyOptions.map(option => (
                            <div key={option} onClick={() => { setSelectedBody(option); setIsBodyModalOpen(false); }} className={`p-4 rounded-xl border cursor-pointer transition-all ${selectedBody === option ? 'bg-indigo-600/30 border-indigo-500' : 'bg-zinc-800/40 border-zinc-700/30 hover:bg-indigo-600/10'}`}>
                                {option}
                            </div>
                        ))}
                    </div>
                </ModalBody>
            </Modal>

            {/* 4. مودال وضعیت فنی (موتور و شاسی) */}
            <Modal isOpen={isTechModalOpen} onClose={() => setIsTechModalOpen(false)}>
                <ModalHeader>وضعیت موتور و شاسی</ModalHeader>
                <ModalBody>
                    <div className="space-y-6 text-right" dir="rtl">

                        {/* بخش موتور */}
                        <div>
                            <h3 className="text-zinc-300 font-medium mb-3">وضعیت موتور:</h3>
                            <div className="grid grid-cols-2 gap-3">
                                {techOptions.map(option => (
                                    <div key={`engine-${option}`} onClick={() => setSelectedEngine(option)} className={`p-3 text-center rounded-xl border cursor-pointer transition-all ${selectedEngine === option ? 'bg-indigo-600/30 border-indigo-500 text-white' : 'bg-zinc-800/40 border-zinc-700/30 text-zinc-400 hover:bg-indigo-600/10'}`}>
                                        {option}
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* بخش شاسی */}
                        <div>
                            <h3 className="text-zinc-300 font-medium mb-3">وضعیت شاسی:</h3>
                            <div className="grid grid-cols-2 gap-3">
                                {techOptions.map(option => (
                                    <div key={`chassis-${option}`} onClick={() => setSelectedChassis(option)} className={`p-3 text-center rounded-xl border cursor-pointer transition-all ${selectedChassis === option ? 'bg-indigo-600/30 border-indigo-500 text-white' : 'bg-zinc-800/40 border-zinc-700/30 text-zinc-400 hover:bg-indigo-600/10'}`}>
                                        {option}
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* دکمه تایید مودال فنی */}
                        <button
                            type="button"
                            disabled={!selectedEngine || !selectedChassis}
                            onClick={() => setIsTechModalOpen(false)}
                            className="w-full mt-4 bg-emerald-600 hover:bg-emerald-500 disabled:bg-zinc-700 disabled:text-zinc-500 text-white font-medium py-3 rounded-xl transition-all"
                        >
                            تایید و ادامه
                        </button>
                    </div>
                </ModalBody>
            </Modal>

        </section>
    );
}
