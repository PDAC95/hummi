import React, { useEffect, useState } from 'react';
import CountUp from 'react-countup';

type AdvanceCountUpProps = {
    ending?: number;
    durations?: number;
    dependOn?: boolean;
}

const AdvanceCountUp: React.FC<AdvanceCountUpProps> = ({
    ending = 32,
    durations = 3,
    dependOn = false,
}) => {
    const [x, setX] = useState<boolean>(true);

    useEffect(() => {
        setX(false);
    }, [dependOn]);

    if (!x) return (
        <span>
            <CountUp
                start={0}
                end={ending}
                duration={durations}
                delay={0}
                separator=","
                decimal="."
                prefix="     "
                suffix=""
            />
        </span>
    );

    return null;
};

export default AdvanceCountUp;