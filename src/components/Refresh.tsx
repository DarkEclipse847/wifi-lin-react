type RefreshProps = {
    interfaces: string[],
    onRefresh: (list_networks: string)=>void;
}

export const RefreshBtn = ({interfaces, onRefresh}: RefreshProps)=>{
    const handleRefresh = (e: React.MouseEvent) => {
        onRefresh(interfaces.toString())
    }
    return(
        <button className="refresh-btn" onClick={handleRefresh}>
            Refresh
        </button>
    )
};