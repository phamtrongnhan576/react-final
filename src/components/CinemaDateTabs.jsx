import React from "react";
import { Tabs } from "antd";
import moment from "moment";
import ShowtimesByDay from "./ShowtimesByDay";

const CinemaDateTabs = ({
    cinema,
    showtimeData,
    activeDayKey,
    handleChangeDayTab,
}) => {
    const cinemaData = showtimeData?.heThongRapChieu?.find(
        (ht) => ht.maHeThongRap === cinema.maHeThongRap
    );
    const cumRaps = cinemaData?.cumRapChieu || [];

    const items = Array.from({ length: 7 }, (_, i) => {
        const tabDate = moment()
            .startOf("week")
            .add(i + 1, "days");
        const dayInTab = tabDate.day();

        return {
            key: String(i),
            label: (
                <div className="w-full py-2 px-1">
                    <div className="font-bold text-xl capitalize">
                        {tabDate.format("dddd")}
                    </div>
                    <div className="text-gray-400 mt-2">
                        {tabDate.format("DD/MM")}
                    </div>
                </div>
            ),
            children: <ShowtimesByDay dayInTab={dayInTab} cumRaps={cumRaps} />,
        };
    });

    return (
        <div className="bg-[#2a2e38] p-4 rounded-xl text-white h-[475px] w-full overflow-auto custom-tab_detail">
            <Tabs
                activeKey={activeDayKey}
                onChange={handleChangeDayTab}
                tabPosition="top"
                items={items}
            />
        </div>
    );
};

export default CinemaDateTabs;
