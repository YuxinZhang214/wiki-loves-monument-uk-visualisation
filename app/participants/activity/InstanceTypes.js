const InstanceTypeTable = ({ instance_types }) => {
    // Determine the maximum count for scaling the bars
    const maxCount = Math.max(...instance_types.map(type => type.total));

    const sortedInstanceTypes = [...instance_types].sort((a, b) => b.total - a.total);

    return (
        <div className="relative overflow-x-auto max-h-80 px-12 text-white">
            <table className="w-full text-sm text-left">
                <thead className="text-xs uppercase border-b">
                    <tr>
                        <th scope="col" className="w-1/2 py-3 text-md">
                            Instance Type
                        </th>
                        <th scope="col" className="w-1/2 py-4 text-md">
                            Count
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {sortedInstanceTypes.map((instance, index) => (
                        <tr key={index}>
                            <td className="py-2 text-md">{instance.instance_of_type_label}</td>
                            <td className="py-2">
                                <div className="flex justify-start h-8"> {/* Use flex to center the bar */}
                                    <div
                                        className="h-8 bg-[#69b3a2] rounded" 
                                        style={{ width: `${(instance.total / maxCount) * 100}%` }}> {/* Dynamic width for colored bar */}
                    
                                    </div>
                                </div>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default InstanceTypeTable;
