import React from 'react';

const StrengthMeter = ({ strength }) => {
    const { level, color, width } = strength;
    return (
        <div>
            <div className="relative h-2 w-full bg-gray-700 rounded-full overflow-hidden">
                <div
                    className="absolute top-0 left-0 h-full rounded-full transition-all duration-500"
                    style={{ width: width, backgroundColor: color }}
                />
            </div>
            <p className="text-right text-sm font-medium mt-1" style={{ color }}>
                {level}
            </p>
        </div>
    );
};

export default StrengthMeter;