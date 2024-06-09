

const CheoutHistory = () => {
    return (
      <div className="mb-10">
          <h2 className="p-2 font-semibold">#My Pending Request</h2>
        <div className="relative overflow-x-auto shadow-md sm:rounded-lg m-2">
          <table className="w-full text-sm text-left rtl:text-right ">
            <thead className="text-xs uppercase bg-indigo-200">
              <tr>
                <th scope="col" className="p-4">
                  <div className="flex items-center">
                    #
                  </div>
                </th>
                <th scope="col" className="px-6 py-3">
                 Amount
                </th>
                <th scope="col" className="px-6 py-3">
                  Transaction ID
                </th>
                <th scope="col" className="px-6 py-3">
                  Date
                </th>
                
                <th scope="col" className="px-6 py-3">
                  Status
                </th>
                
              </tr>
            </thead>
            <tbody>
              <tr className="bg-white border-b ">
                <td className="w-4 p-4">
                  <div className="flex items-center">
                    1
                  </div>
                </td>
                <th
                  scope="row"
                  className="px-6 py-4 font-medium whitespace-nowrap"
                >
                  Apple MacBook Pro 17"
                </th>
                <td className="px-6 py-4">Silver</td>
                <td className="px-6 py-4">Laptop</td>
                <td className="px-6 py-4">Yes</td>
                
              </tr>
              
            </tbody>
          </table>
        </div>
      </div>
    );
  };
  
  export default CheoutHistory;
  