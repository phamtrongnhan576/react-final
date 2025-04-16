import React from "react";
import { Tabs } from "antd";
import CinemaDateTabs from "./CinemaDateTabs";

const CinemaSystemTabs = ({
    cinemaList,
    showtimeData,
    cinemaDayDefaults,
    activeDayTabKeys,
    setActiveDayTabKeys,
}) => {
    const items = cinemaList?.map((cinema) => {
        const sanitizeKey = (key) => key.replace(/[^a-zA-Z0-9-_]/g, "-");

        const handleChangeDayTab = (key) => {
            setActiveDayTabKeys((prev) => ({
                ...prev,
                [cinema.maHeThongRap]: key,
            }));
        };

        const defaultDayKey = cinemaDayDefaults[cinema.maHeThongRap] || "0";
        const activeDayKey =
            activeDayTabKeys[cinema.maHeThongRap] ?? defaultDayKey;

        return {
            key: sanitizeKey(cinema.maHeThongRap),
            label: (
                <div className="w-16 h-16 rounded-lg overflow-hidden p-1 bg-white mr-3">
                    <img
                        src={cinema.logo || "https://placehold.co/600x400/png"}
                        alt={cinema.tenHeThongRap || "Cinema Logo"}
                        className="w-full h-full object-contain"
                        onError={(e) =>
                            (e.target.src = "https://placehold.co/600x400/png")
                        }
                    />
                </div>
            ),
            children: (
                <CinemaDateTabs
                    cinema={cinema}
                    showtimeData={showtimeData}
                    activeDayKey={activeDayKey}
                    handleChangeDayTab={handleChangeDayTab}
                />
            ),
        };
    });

    return (
        <div className="mt-1 bg-[#1c1f26] rounded-lg">
            <Tabs
                tabPosition="left"
                className="cinema-tabs custom-tabs"
                defaultActiveKey={cinemaList?.[0]?.maHeThongRap}
                items={items}
            />
        </div>
    );
};

export default CinemaSystemTabs;
