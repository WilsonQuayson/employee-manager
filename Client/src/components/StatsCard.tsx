type StatsCardProps = {
    title: string;
    value: string;
    iconPath: string;
    badge: string;
    badgeClassName: string;
    detail?: string;
};

const StatsCard = ({
    title,
    value,
    iconPath,
    badge,
    badgeClassName,
    detail,
}: StatsCardProps) => {
    return (
        <div className="min-h-45 min-w-0 rounded-2xl border-2 border-black/10 px-6 py-5 shadow-[0_0_50px_-12px_rgba(0,0,0,0.18)]">
            <div className="flex h-full flex-col justify-between">
                <div className="flex items-start justify-between gap-3">
                    <p className="min-w-0 wrap-break-word font-medium text-ring">{title}</p>
                    <div className="rounded-full bg-primary/30 p-2.5">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth={1.5}
                            stroke="currentColor"
                            className="size-6 text-primary"
                            aria-hidden="true"
                        >
                            <path strokeLinecap="round" strokeLinejoin="round" d={iconPath} />
                        </svg>
                    </div>
                </div>
                <div>
                    <p className="text-4xl font-bold">{value}</p>
                    <div className="mt-2 flex flex-wrap items-center gap-2">
                        <div className={`rounded-2xl px-3 py-0.5 font-medium ${badgeClassName}`}>
                            {badge}
                        </div>
                        {detail && <span className="min-w-0 wrap-break-word font-medium text-ring">{detail}</span>}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default StatsCard;
