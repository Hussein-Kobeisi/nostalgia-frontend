function groupCapsByInterval(capsData){
    const groups = {};

    capsData.forEach(cap => {
        const year = new Date(cap.open_date).getFullYear();
        const interval = Math.floor(year / 5) * 5;

        if (!groups[interval]) {
        groups[interval] = [];
        }
        groups[interval].push(cap);
    });

    return groups;
};

export function trySettingIntervals(didMount, setIntervals, groups)
{
    if (didMount.current){
        console.log('setting Intervals..')
        setIntervals(Object.keys(groups).map(Number).sort((a, b) => b - a))
    }else
        didMount.current = true;
}

export function trySettingGroups(didMount, setGroups, capsData)
{
    if (didMount.current){
        console.log('setting Groups..')
        setGroups(groupCapsByInterval(capsData));
    }else
        didMount.current = true;
}