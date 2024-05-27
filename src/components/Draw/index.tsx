export function Draw(
    startX: number,
    startY: number,
    endX: number,
    endY: number,
    topY: number,
    isPositive: boolean,
    diff: number,
    max: number
) {
    const textCentr = {
        x: getCentrX(diff, startX, endX),
        y: topY - 30,
    };

    if (max)
        return (
            <svg
                width="100%"
                height="100%"
                style={{ position: "absolute", top: 0, left: 0 }}
            >
                <path
                    d={`M ${startX + 40 + 20} ${startY - 9} v ${
                        topY - startY - 9
                    } h ${endX - 20 - startX - 20} L ${endX + 20} ${
                        endY - 9
                    } L ${endX + 24} ${endY - 13} M ${endX + 20} ${
                        endY - 9
                    } L ${endX + 16} ${endY - 13}`}
                    stroke="var(--grey)"
                    fill="none"
                />
                <rect
                    x={`${textCentr.x}`}
                    y={`${textCentr.y}`}
                    rx="12"
                    ry="12"
                    width={getWidth(diff)}
                    height="24"
                    stroke="none"
                    fill={
                        diff === 0
                            ? "var(--grey)"
                            : isPositive
                            ? "var(--good)"
                            : "var(--bad)"
                    }
                    strokeWidth="5"
                />
                <text
                    x={
                        diff === 0
                            ? `${textCentr.x + 21}`
                            : `${textCentr.x + 17}`
                    }
                    y={`${textCentr.y + 11}`}
                    fontFamily="Roboto-Bold"
                    fontSize="14"
                    fill="var(--white)"
                    alignmentBaseline="central"
                >
                    {diff === 0
                        ? "="
                        : isPositive
                        ? `+${Math.abs(diff)}`
                        : `-${Math.abs(diff)}`}
                </text>
                {diff !== 0 && (
                    <path
                        style={{
                            transformOrigin: `${textCentr.x + 10}px ${
                                textCentr.y + 11.2
                            }px`,
                            transform: `rotate(${isPositive ? 0 : 180}deg)`,
                        }}
                        d={`M ${textCentr.x + 10} ${textCentr.y + 15}
                L ${textCentr.x + 10} ${textCentr.y + 7} 
                M ${textCentr.x + 10} ${textCentr.y + 7}
                L ${textCentr.x + 13} ${textCentr.y + 9} 
                M ${textCentr.x + 10} ${textCentr.y + 7} 
                L${textCentr.x + 7} ${textCentr.y + 9}
                `}
                        fill="none"
                        stroke="var(--white)"
                        strokeWidth="2"
                        strokeLinecap="round"
                    />
                )}
            </svg>
        );
}

function getWidth(number: number) {
    const absNumber = Math.abs(number);
    let result = "48";
    if (absNumber > 999) result = "58";
    if (absNumber > 9999) result = "68";
    if (absNumber > 99999) result = "78";
    if (absNumber > 999999) result = "88";
    if (absNumber > 9999999) result = "98";
    return result;
}

function getCentrX(number: number, startX: number, endX: number) {
    const absNumber = Math.abs(number);
    let x = startX + 60 + (endX + 20 - startX - 60) / 2 - 24;
    if (absNumber > 999) x -= 2;
    if (absNumber > 9999) x -= 4;
    if (absNumber > 99999) x -= 6;
    if (absNumber > 999999) x -= 7;
    if (absNumber > 9999999) x -= 9;
    return x;
}
