import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ChevronDownIcon, SlidersHorizontalIcon } from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";
import { useProducts } from "@/hooks/useProducts";

export default function Component() {
  const { products, loading, error, setPage } = useProducts();
  const [selectedFilters, setSelectedFilters] = useState({
    Brand: [] as string[],
    Size: [] as string[],
    Color: [] as string[],
    Price: [] as string[],
  });
  const [drawerOpen, setDrawerOpen] = useState(false);

  const filterOptions = [
    {
      Brand: [
        "Nike",
        "Adidas",
        "Puma",
        "New Balance",
        "Asics",
        "Reebok",
        "Under Armour",
      ],
    },
    { Size: ["5", "6", "7", "8", "9", "10", "11", "12"] },
    {
      Color: [
        "Black",
        "White",
        "Red",
        "Blue",
        "Green",
        "Yellow",
        "Gray",
        "Pink",
      ],
    },
    { Price: ["Low", "Medium", "High"] },
  ];

  // Helper function to update filters
  const handleFilterChange = (
    filterName: keyof typeof selectedFilters,
    filterValue: string
  ) => {
    setSelectedFilters((prevState) => {
      const filterArray = prevState[filterName];
      const isAlreadySelected = filterArray.includes(filterValue);

      // Toggle the filter selection
      const updatedFilterArray = isAlreadySelected
        ? filterArray.filter((val) => val !== filterValue)
        : [...filterArray, filterValue];

      return { ...prevState, [filterName]: updatedFilterArray };
    });
  };

  // Generate query string for the API
  const generateQueryString = () => {
    let queryString = "shoes";
    Object.entries(selectedFilters).forEach(([filterName, values]) => {
      if (values.length > 0) {
        queryString += `&${values.join("&")}`;
      }
    });
    return queryString;
  };

  useEffect(() => {
    // Store filters in sessionStorage and update API
    sessionStorage.setItem("filters", JSON.stringify(selectedFilters));
    // The `useProducts` hook will automatically fetch the products using the updated query
  }, [selectedFilters]);

  return (
    <div className="w-full mx-auto">
      {/* Mobile View */}
      <div className="flex items-center justify-between py-4 lg:hidden">
        <Button
          variant="outline"
          className="flex items-center text-sm"
          onClick={() => setDrawerOpen(true)}
        >
          <SlidersHorizontalIcon className="w-4 h-4 mr-2" />
          Filters
        </Button>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="text-sm">
              Sort by <ChevronDownIcon className="w-4 h-4 ml-2" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem>Price: Low to High</DropdownMenuItem>
            <DropdownMenuItem>Price: High to Low</DropdownMenuItem>
            <DropdownMenuItem>Newest</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      {/* Drawer for Filters (Mobile) */}
      {drawerOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg w-11/12 max-h-[80vh] overflow-y-auto">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold">Filters</h2>
              <Button variant="ghost" onClick={() => setDrawerOpen(false)}>
                Close
              </Button>
            </div>

            <div className="mt-4 space-y-6">
              {filterOptions.map((option, index) => {
                const filterName = Object.keys(
                  option
                )[0] as keyof typeof option;
                const filterProp = option[filterName];
                return (
                  <div key={index}>
                    <h3 className="font-semibold text-md">{filterName}</h3>
                    <div className="grid grid-cols-2 gap-4 mt-2">
                      {filterProp?.map((filterValue, idx) => (
                        <div key={idx} className="flex items-center space-x-2">
                          <Checkbox
                            id={`${filterName}-${filterValue}`}
                            checked={selectedFilters[filterName].includes(
                              filterValue
                            )}
                            onCheckedChange={() =>
                              handleFilterChange(filterName, filterValue)
                            }
                          />
                          <label
                            htmlFor={`${filterName}-${filterValue}`}
                            className="text-sm"
                          >
                            {filterValue}
                          </label>
                        </div>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="mt-6">
              <Button className="w-full" onClick={() => setDrawerOpen(false)}>
                Apply Filters
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Desktop View */}
      <div className="items-center justify-between hidden py-4 lg:flex border-y">
        <div className="flex space-x-2">
          {filterOptions.map((option, index) => {
            const filterName = Object.keys(option)[0] as keyof typeof option;
            const filterProp = option[filterName];
            return (
              <DropdownMenu key={index}>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" className="text-sm">
                    {filterName} <ChevronDownIcon className="w-4 h-4 ml-2" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent
                  className={`grid ${
                    filterName === "Size" ? "grid-cols-3" : "grid-cols-2"
                  }  gap-4 p-4`}
                >
                  {filterProp?.map((filterValue, idx) => (
                    <div key={idx} className="flex items-center space-x-2">
                      <Checkbox
                        id={`${filterName}-${filterValue}`}
                        checked={selectedFilters[filterName].includes(
                          filterValue
                        )}
                        onCheckedChange={() =>
                          handleFilterChange(filterName, filterValue)
                        }
                      />
                      <label
                        htmlFor={`${filterName}-${filterValue}`}
                        className="text-sm"
                      >
                        {filterValue}
                      </label>
                    </div>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>
            );
          })}
        </div>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="text-sm">
              Sort by <ChevronDownIcon className="w-4 h-4 ml-2" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem>Price: Low to High</DropdownMenuItem>
            <DropdownMenuItem>Price: High to Low</DropdownMenuItem>
            <DropdownMenuItem>Newest</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
}
