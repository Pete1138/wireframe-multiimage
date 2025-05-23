import React, { useState } from 'react';
import { X, Plus, HelpCircle, Info } from 'lucide-react';

// --- Define Interface for Car View Data ---
interface CarView {
  id: number;
  name: string;
  angle: string;
  color: string;
  trim: string;
  viewType: string;
  letter: string;
  order: number;
  createdDate: string;
}
// --- End Interface Definition ---

// --- Define Interface for Preview Data (Subset of CarView) ---
interface PreviewData {
    color: string;
    letter: string;
    viewType: string;
}
// --- End Preview Interface ---


const FleetManagementDashboard = () => {
  // Initial car views data
  const initialCarViews: CarView[] = [
    // Red vehicles
    { id: 1, name: "View 1", angle: "45°", color: "Red", trim: "Sport", viewType: "Front View", letter: "F", order: 1, createdDate: "01/01/2000" },
    { id: 2, name: "View 2", angle: "90°", color: "Red", trim: "Sport", viewType: "Side View", letter: "S", order: 2, createdDate: "01/01/2000" },
    { id: 3, name: "View 3", angle: "135°", color: "Red", trim: "Sport", viewType: "Rear View", letter: "R", order: 3, createdDate: "01/01/2000" },
    { id: 4, name: "View 4", angle: "180°", color: "Red", trim: "Sport", viewType: "Rear View", letter: "R", order: 4, createdDate: "01/01/2000" },
    { id: 5, name: "View 5", angle: "225°", color: "Red", trim: "Sport", viewType: "3/4 Front View", letter: "3F", order: 5, createdDate: "01/01/2000" },
    { id: 6, name: "View 6", angle: "270°", color: "Red", trim: "Sport", viewType: "3/4 Rear View", letter: "3R", order: 6, createdDate: "01/01/2000" },
    
    // Green vehicles
    { id: 7, name: "View 1", angle: "45°", color: "Green", trim: "Luxury", viewType: "Front View", letter: "F", order: 1, createdDate: "02/02/2000" },
    { id: 8, name: "View 2", angle: "90°", color: "Green", trim: "Luxury", viewType: "Side View", letter: "S", order: 2, createdDate: "02/02/2000" },
    { id: 9, name: "View 3", angle: "135°", color: "Green", trim: "Luxury", viewType: "Rear View", letter: "R", order: 3, createdDate: "02/02/2000" },
    { id: 10, name: "View 4", angle: "180°", color: "Green", trim: "Luxury", viewType: "Rear View", letter: "R", order: 4, createdDate: "02/02/2000" },
    { id: 11, name: "View 5", angle: "225°", color: "Green", trim: "Luxury", viewType: "3/4 Front View", letter: "3F", order: 5, createdDate: "02/02/2000" },
    { id: 12, name: "View 6", angle: "270°", color: "Green", trim: "Luxury", viewType: "3/4 Rear View", letter: "3R", order: 6, createdDate: "02/02/2000" },
    
    // Blue vehicles
    { id: 13, name: "View 1", angle: "45°", color: "Blue", trim: "Premium", viewType: "Front View", letter: "F", order: 1, createdDate: "03/03/2000" },
    { id: 14, name: "View 2", angle: "90°", color: "Blue", trim: "Premium", viewType: "Side View", letter: "S", order: 2, createdDate: "03/03/2000" },
    { id: 15, name: "View 3", angle: "135°", color: "Blue", trim: "Premium", viewType: "Rear View", letter: "R", order: 3, createdDate: "03/03/2000" },
    { id: 16, name: "View 4", angle: "180°", color: "Blue", trim: "Premium", viewType: "Rear View", letter: "R", order: 4, createdDate: "03/03/2000" },
    { id: 17, name: "View 5", angle: "225°", color: "Blue", trim: "Premium", viewType: "3/4 Front View", letter: "3F", order: 5, createdDate: "03/03/2000" },
    { id: 18, name: "View 6", angle: "270°", color: "Blue", trim: "Premium", viewType: "3/4 Rear View", letter: "3R", order: 6, createdDate: "03/03/2000" }
  ];

  // State declarations
  const [title] = useState("Virtual Asset Hyundai All-New INSTER");
  const [selectedNavItem, setSelectedNavItem] = useState("Images");
  const [selectedViews, setSelectedViews] = useState<number[]>([]);
  const [carViews, setCarViews] = useState<CarView[]>(initialCarViews);
  const [filters, setFilters] = useState({
    angle: "",
    color: "",
    trim: ""
  });
  const [draggedItem, setDraggedItem] = useState<CarView | null>(null);
  const [showAddModal, setShowAddModal] = useState(false);
  
  // --- Add state for the new image modal ---
  const [newImageAngle, setNewImageAngle] = useState('');
  const [newImageColor, setNewImageColor] = useState('');
  const [newImageTrim, setNewImageTrim] = useState('');
  const [newImageYear, setNewImageYear] = useState('2023');
  const [previewData, setPreviewData] = useState<PreviewData | null>(null);
  // --- End of new state ---

  // --- Add state for Image Bank filters ---
  const [imageBankFilters, setImageBankFilters] = useState({
    make: "Hyundai",
    model: "All-New INSTER",
    variant: "",
    color: "",
    angle: "",
    year: ""
  });
  // --- End of Image Bank filters state ---

  // --- Add Image Bank options ---
  const imageBankColorOptions = ["Red", "Blue", "Green", "Black", "White", "Silver"];
  const imageBankAngleOptions = ["45°", "90°", "135°", "180°", "225°", "270°", "315°"];
  const yearOptions = ["2025", "2024", "2023", "2022", "2021", "2020"];
  // --- End of Image Bank options ---
  
  // Check if only color filter is applied
  const isColorFilterOnly = filters.color !== "" && filters.angle === "" && filters.trim === "";
  
  // Get unique values for filters
  const angleOptions = ["", ...new Set(initialCarViews.map(view => view.angle))];
  const colorOptions = ["", ...new Set(initialCarViews.map(view => view.color))];
  const trimOptions = ["", ...new Set(initialCarViews.map(view => view.trim))];
  
  // Modify options slightly for the modal (remove empty initial value)
  const modalAngleOptions = [...new Set(initialCarViews.map(view => view.angle))];
  const modalColorOptions = [...new Set(initialCarViews.map(view => view.color))];
  const modalTrimOptions = [...new Set(initialCarViews.map(view => view.trim))];
  
  // Add sort state
  const [sortBy, setSortBy] = useState<'createdDate' | 'angle' | 'color' | 'trim'>('createdDate');
  const [sortDirection, setSortDirection] = useState<'ASC' | 'DESC'>('ASC');

  // Modify the filteredCarViews to include sorting
  const filteredCarViews = carViews.filter(view => {
    if (filters.angle && view.angle !== filters.angle) return false;
    if (filters.color && view.color !== filters.color) return false;
    if (filters.trim && view.trim !== filters.trim) return false;
    return true;
  }).sort((a, b) => {
    // First sort by the selected sort field
    let comparison = 0;
    switch (sortBy) {
      case 'createdDate':
        comparison = new Date(a.createdDate).getTime() - new Date(b.createdDate).getTime();
        break;
      case 'angle':
        comparison = a.angle.localeCompare(b.angle);
        break;
      case 'color':
        comparison = a.color.localeCompare(b.color);
        break;
      case 'trim':
        comparison = a.trim.localeCompare(b.trim);
        break;
    }
    
    // Apply sort direction
    if (sortDirection === 'DESC') {
      comparison = -comparison;
    }
    
    // If the sort field values are equal, maintain the original order within color groups
    if (comparison === 0) {
      if (a.color === b.color) {
        return a.order - b.order;
      }
      return a.color.localeCompare(b.color);
    }
    
    return comparison;
  });
  
  // Event handlers
  const handleFilterChange = (filterType: 'angle' | 'color' | 'trim', value: string) => {
    setFilters({
      ...filters,
      [filterType]: value
    });
  };
  
  const toggleViewSelection = (viewId: number) => {
    if (selectedViews.includes(viewId)) {
      setSelectedViews(selectedViews.filter(id => id !== viewId));
    } else {
      setSelectedViews([...selectedViews, viewId]);
    }
  };
  
  const handleDeleteSelected = () => {
    // Remove the selected views from carViews
    setCarViews(carViews.filter(view => !selectedViews.includes(view.id)));
    // Clear the selection
    setSelectedViews([]);
  };
  
  const handleReset = () => {
    // Reset to the initial state
    setCarViews(initialCarViews);
    setSelectedViews([]);
    setFilters({
      angle: "",
      color: "",
      trim: ""
    });
  };
  
  // Drag and Drop handlers
  const handleDragStart = (e: React.DragEvent<HTMLDivElement>, view: CarView) => {
    if (!isColorFilterOnly) return;
    setDraggedItem(view);
    e.dataTransfer.effectAllowed = "move";
  };
  
  const handleDragOver = (e: React.DragEvent<HTMLDivElement>, targetView: CarView) => {
    e.preventDefault();
    if (!isColorFilterOnly || !draggedItem || draggedItem.id === targetView.id || draggedItem.color !== targetView.color) return;
    e.dataTransfer.dropEffect = "move";
  };
  
  const handleDrop = (e: React.DragEvent<HTMLDivElement>, targetView: CarView) => {
    e.preventDefault();
    if (!isColorFilterOnly || !draggedItem || draggedItem.id === targetView.id || draggedItem.color !== targetView.color) return;
    
    // Create a new array with updated orders
    const updatedViews = carViews.map(view => {
      // Skip views of different colors
      if (view.color !== draggedItem.color) return view;
      
      // Handle the dragged item
      if (view.id === draggedItem.id) {
        return { ...view, order: targetView.order };
      }
      
      // Handle items between the source and destination
      if (draggedItem.order < targetView.order) {
        if (view.order > draggedItem.order && view.order <= targetView.order) {
          return { ...view, order: view.order - 1 };
        }
      } else if (draggedItem.order > targetView.order) {
        if (view.order >= targetView.order && view.order < draggedItem.order) {
          return { ...view, order: view.order + 1 };
        }
      }
      
      return view;
    });
    
    setCarViews(updatedViews);
    setDraggedItem(null);
  };
  
  const handleDragEnd = () => {
    setDraggedItem(null);
  };

  // --- Add Handlers for the Modal ---
  const resetModalForm = () => {
    setNewImageAngle(modalAngleOptions[0] || '');
    setNewImageColor('');
    setNewImageTrim('');
    setNewImageYear(yearOptions[0]);
    setPreviewData(null);
  };

  const handleOpenAddModal = () => {
    resetModalForm();
    setShowAddModal(true);
  };

  const handleCancelAddModal = () => {
    setShowAddModal(false);
    setPreviewData(null);
  };

  // Function to determine viewType and letter (reusable)
  const determineViewDetails = (angle: string): { viewType: string, letter: string } => {
      let viewType = "Unknown View";
      let letter = "?";
      if (angle.includes("Front") && angle.includes("3/4")) { viewType = "3/4 Front View"; letter = "3F"; }
      else if (angle.includes("Rear") && angle.includes("3/4")) { viewType = "3/4 Rear View"; letter = "3R"; }
      else if (angle.includes("Front")) { viewType = "Front View"; letter = "F"; }
      else if (angle.includes("Side")) { viewType = "Side View"; letter = "S"; }
      else if (angle.includes("Rear")) { viewType = "Rear View"; letter = "R"; }
      else if (angle.includes("Top")) { viewType = "Top View"; letter = "T"; }
      return { viewType, letter };
  };

  // --- Add Preview Handler ---
  const handlePreview = () => {
      if (!newImageAngle || !newImageColor) {
          alert("Please select at least Angle and Color to preview.");
          return;
      }
      const { viewType, letter } = determineViewDetails(newImageAngle);
      setPreviewData({
          color: newImageColor,
          letter: letter,
          viewType: viewType
      });
  };
  // --- End Preview Handler ---

  // --- Add state for Image Bank search results and selection ---
  const [imageBankResults, setImageBankResults] = useState<CarView[]>([]);
  const [selectedImageBankItems, setSelectedImageBankItems] = useState<number[]>([]);
  // --- End of Image Bank state ---

  // --- Add Image Bank search handler ---
  const handleImageBankSearch = () => {
    // Filter the initial car views based on color and angle
    const results = initialCarViews.filter(view => {
      if (imageBankFilters.color && view.color !== imageBankFilters.color) return false;
      if (imageBankFilters.angle && view.angle !== imageBankFilters.angle) return false;
      return true;
    });

    setImageBankResults(results);
    setSelectedImageBankItems([]);
  };
  // --- End of Image Bank search handler ---

  // --- Add Image Bank selection handler ---
  const toggleImageBankSelection = (viewId: number) => {
    if (selectedImageBankItems.includes(viewId)) {
      setSelectedImageBankItems(selectedImageBankItems.filter(id => id !== viewId));
    } else {
      setSelectedImageBankItems([...selectedImageBankItems, viewId]);
    }
  };
  // --- End of Image Bank selection handler ---

  // --- Modify handleSaveImage to handle multiple selections ---
  const handleSaveImage = () => {
    if (activeTab === 'imagine') {
      if (!newImageAngle || !newImageColor || !newImageTrim) {
        alert("Please fill in all fields.");
        return;
      }

      const { viewType, letter } = determineViewDetails(newImageAngle);
      const newId = Math.max(0, ...carViews.map(v => v.id)) + 1;
      const newOrder = Math.max(0, ...carViews.filter(v => v.color === newImageColor).map(v => v.order)) + 1;

      const newVehicle: CarView = {
        id: newId,
        name: viewType,
        angle: newImageAngle,
        color: newImageColor,
        trim: newImageTrim,
        viewType: viewType,
        letter: letter,
        order: newOrder,
        createdDate: "01/01/2000"
      };

      const updatedViews = [...carViews, newVehicle].sort((a, b) => {
        if (a.color === b.color) {
          return a.order - b.order;
        }
        return a.color.localeCompare(b.color);
      });

      setCarViews(updatedViews);
    } else if (activeTab === 'bank' && selectedImageBankItems.length > 0) {
      const selectedItems = imageBankResults.filter(item => selectedImageBankItems.includes(item.id));
      const newViews = selectedItems.map(item => {
        const newId = Math.max(0, ...carViews.map(v => v.id)) + 1;
        const newOrder = Math.max(0, ...carViews.filter(v => v.color === item.color).map(v => v.order)) + 1;
        return {
          ...item,
          id: newId,
          order: newOrder,
          createdDate: "01/01/2000"
        };
      });

      const updatedViews = [...carViews, ...newViews].sort((a, b) => {
        if (a.color === b.color) {
          return a.order - b.order;
        }
        return a.color.localeCompare(b.color);
      });

      setCarViews(updatedViews);
    }

    setShowAddModal(false);
    setPreviewData(null);
    setSelectedImageBankItems([]);
  };
  // --- End of modified handleSaveImage ---

  // --- Add Image Bank filter handler ---
  const handleImageBankFilterChange = (filterType: keyof typeof imageBankFilters, value: string) => {
    setImageBankFilters(prev => ({
      ...prev,
      [filterType]: value
    }));
  };
  // --- End of Image Bank filter handler ---

  // --- Add state for active tab ---
  const [activeTab, setActiveTab] = useState<'imagine' | 'bank'>('imagine');
  // --- End of active tab state ---

  // --- Add state for default vehicles ---
  const [defaultVehicles, setDefaultVehicles] = useState<{ [key: string]: number }>(() => {
    // Create an object to store the first vehicle ID for each color
    const defaults: { [key: string]: number } = {};
    // Group vehicles by color and get the first one of each color
    initialCarViews.forEach(view => {
      if (!defaults[view.color]) {
        defaults[view.color] = view.id;
      }
    });
    return defaults;
  });
  // --- End of default vehicles state ---

  // --- Add handler for making a vehicle default ---
  const handleMakeDefault = () => {
    if (selectedViews.length === 1) {
      const selectedVehicle = carViews.find(v => v.id === selectedViews[0]);
      if (selectedVehicle) {
        setDefaultVehicles(prev => ({
          ...prev,
          [selectedVehicle.color]: selectedVehicle.id
        }));
      }
    }
  };
  // --- End of make default handler ---

  // Navigation sidebar items
  const navItems = [
    { icon: "workflow", label: "Workflows", subItems: [] },
    { 
      icon: "assets", 
      label: "Assets", 
      subItems: [
        "Booking History",
        "Documents",
        "Images",
        "Pricing",
        "Properties",
        "Telematics"
      ]
    },
    { icon: "bookings", label: "Bookings", subItems: [] },
    { icon: "compliance", label: "Compliance", subItems: [] },
    { icon: "customers", label: "Customers", subItems: [] },
    { icon: "dashboard", label: "Dashboard", subItems: [] },
    { icon: "events", label: "Events", subItems: [] },
    { icon: "leads", label: "Leads", subItems: [] },
    { icon: "ledger", label: "Ledger", subItems: [] },
    { icon: "logistics", label: "Logistics", subItems: [] },
    { icon: "payments", label: "Payments", subItems: [] },
    { icon: "pricing", label: "Pricing", subItems: [] }
  ];

  // Helper function to render icon based on label
  const renderIcon = (iconType: string) => {
    switch(iconType) {
      case "workflow":
        return <div className="w-5 h-5 text-white opacity-80">◻</div>;
      case "assets":
        return <div className="w-5 h-5 text-white opacity-80">🚗</div>;
      case "bookings":
        return <div className="w-5 h-5 text-white opacity-80">📅</div>;
      case "compliance":
        return <div className="w-5 h-5 text-white opacity-80">✓</div>;
      case "customers":
        return <div className="w-5 h-5 text-white opacity-80">👥</div>;
      case "dashboard":
        return <div className="w-5 h-5 text-white opacity-80">📊</div>;
      case "events":
        return <div className="w-5 h-5 text-white opacity-80">🗓️</div>;
      case "leads":
        return <div className="w-5 h-5 text-white opacity-80">🔍</div>;
      case "ledger":
        return <div className="w-5 h-5 text-white opacity-80">📒</div>;
      case "logistics":
        return <div className="w-5 h-5 text-white opacity-80">🚚</div>;
      case "payments":
        return <div className="w-5 h-5 text-white opacity-80">💰</div>;
      case "pricing":
        return <div className="w-5 h-5 text-white opacity-80">💲</div>;
      default:
        return <div className="w-5 h-5 text-white opacity-80">◻</div>;
    }
  };

  return (
    <div className="flex flex-col h-screen bg-gray-100">
      {/* Top Navbar */}
      <header className="flex items-center justify-between px-4 py-2 bg-white border-b border-gray-200">
        <div className="flex items-center space-x-2">
          <button className="p-1 rounded hover:bg-gray-100">
            <X className="w-5 h-5 text-gray-500" />
          </button>
          <div className="w-8 h-8 bg-indigo-100 rounded-full flex items-center justify-center">
            <div className="text-indigo-600 text-lg">⬡</div>
          </div>
          <h1 className="text-lg font-medium">{title}</h1>
        </div>
        <div className="flex items-center space-x-4">
          <button 
            onClick={handleReset}
            className="flex items-center space-x-1 text-indigo-600 bg-indigo-50 px-3 py-1 rounded-full text-sm hover:bg-indigo-100 transition-colors"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="mr-1">
              <path d="M1 4V10H7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              <path d="M3.51 15C4.15839 16.8404 5.38734 18.4202 7.01166 19.5014C8.63598 20.5826 10.5677 21.1066 12.5157 20.9945C14.4637 20.8824 16.3226 20.1402 17.8121 18.8798C19.3017 17.6194 20.3413 15.909 20.7742 14.0064C21.2072 12.1037 21.0101 10.1266 20.2126 8.34816C19.4152 6.56968 18.0605 5.0771 16.3528 4.13312C14.645 3.18914 12.6759 2.84573 10.7488 3.15386C8.82174 3.46199 7.02464 4.40444 5.64 5.83998L1 10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            <span>RESET</span>
          </button>
          <button className="p-1 rounded hover:bg-gray-100">
            <Info className="w-5 h-5 text-gray-500" />
          </button>
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-indigo-600 rounded-full flex items-center justify-center text-white">
              M
            </div>
            <div className="text-xs">
              <div>bobby.biscuits@tj.com</div>
              <div className="text-gray-500">Hyundai</div>
              <div className="text-gray-500">Timezone: Europe, London</div>
            </div>
          </div>
        </div>
      </header>

      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar Navigation */}
        <nav className="w-48 bg-indigo-900 text-white overflow-y-auto">
          <div className="py-4 px-2">
            <div className="text-xs font-semibold text-indigo-300 px-4 mb-2">WORKSPACE</div>
            
            {navItems.map((item) => (
              <div key={item.label} className="mb-1">
                <div 
                  className={`flex items-center px-4 py-2 rounded-md cursor-pointer ${
                    item.label === "Assets" ? "bg-indigo-800" : "hover:bg-indigo-800"
                  }`}
                  onClick={() => setSelectedNavItem(item.label)}
                >
                  {renderIcon(item.icon)}
                  <span className="ml-2 text-sm">{item.label}</span>
                </div>
                
                {item.label === "Assets" && (
                  <div className="ml-4 mt-1">
                    {item.subItems.map((subItem) => (
                      <div 
                        key={subItem}
                        className={`px-4 py-1 text-sm rounded-md cursor-pointer ${
                          subItem === selectedNavItem ? "bg-indigo-700 text-white" : "text-indigo-300 hover:bg-indigo-800"
                        }`}
                        onClick={() => setSelectedNavItem(subItem)}
                      >
                        {subItem}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
          <div className="absolute bottom-4 left-0 w-48 px-4">
            <button className="w-full bg-indigo-700 hover:bg-indigo-600 text-white py-2 rounded-md text-sm flex items-center justify-center">
              <HelpCircle className="w-4 h-4 mr-2" />
              <span>Need help with Ops?</span>
            </button>
          </div>
        </nav>

        {/* Main Content Area */}
        <main className="flex-1 overflow-auto bg-white p-6">
          {/* Images Content */}
          <div className="border rounded-md">
            <div className="p-4 border-b flex justify-between items-center">
              <h2 className="text-xl font-medium">Virtual Asset Images - Hyundai All-New INSTER</h2>
              <div className="flex space-x-3">
                {selectedViews.length === 1 && (
                  <button 
                    onClick={handleMakeDefault}
                    className="px-3 py-2 bg-blue-100 text-blue-800 rounded-md text-sm hover:bg-blue-200 transition-colors flex items-center"
                  >
                    Make Default for Color
                  </button>
                )}
                {selectedViews.length > 0 && (
                  <button 
                    onClick={handleDeleteSelected}
                    className="px-3 py-2 bg-red-600 text-white rounded-md text-sm hover:bg-red-700 transition-colors flex items-center"
                  >
                    <X className="w-4 h-4 mr-1" />
                    Delete Selected
                  </button>
                )}
                <button 
                  onClick={handleOpenAddModal}
                  className="px-3 py-2 bg-indigo-600 text-white rounded-md text-sm hover:bg-indigo-700 transition-colors flex items-center"
                >
                  <Plus className="w-4 h-4 mr-1" />
                  Add Image
                </button>
              </div>
            </div>
            <div className="p-6">
              {/* Filter controls */}
              <div className="mb-6 flex flex-wrap justify-between gap-4">
                <div className="flex flex-wrap gap-4">
                  <div className="flex flex-col">
                    <label className="text-sm text-gray-600 mb-1">Angle</label>
                    <select 
                      className="border border-gray-300 rounded-md px-3 py-1.5 w-48 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                      value={filters.angle}
                      onChange={(e: React.ChangeEvent<HTMLSelectElement>) => handleFilterChange("angle", e.target.value)}
                    >
                      <option value="">All Angles</option>
                      {angleOptions.filter(option => option !== "").map(angle => (
                        <option key={angle} value={angle}>{angle}</option>
                      ))}
                    </select>
                  </div>
                  
                  <div className="flex flex-col">
                    <label className="text-sm text-gray-600 mb-1 flex items-center">
                      Color
                      <div className="relative group ml-1">
                        <div className="text-gray-400 cursor-help">
                          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" />
                            <path d="M12 16V12M12 8H12.01" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                          </svg>
                        </div>
                        <div className="absolute bottom-full left-0 mb-2 w-60 bg-gray-800 text-white text-xs rounded p-2 shadow-lg whitespace-normal z-20 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all">
                          Filter by Color only to set the image order
                          <div className="absolute left-2 top-full w-3 h-3 -mt-1.5 bg-gray-800 transform rotate-45"></div>
                        </div>
                      </div>
                    </label>
                    <select 
                      className="border border-gray-300 rounded-md px-3 py-1.5 w-48 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                      value={filters.color}
                      onChange={(e: React.ChangeEvent<HTMLSelectElement>) => handleFilterChange("color", e.target.value)}
                    >
                      <option value="">All Colors</option>
                      {colorOptions.filter(option => option !== "").map(color => (
                        <option key={color} value={color}>{color}</option>
                      ))}
                    </select>
                  </div>
                  
                  <div className="flex flex-col">
                    <label className="text-sm text-gray-600 mb-1">Trim</label>
                    <select 
                      className="border border-gray-300 rounded-md px-3 py-1.5 w-48 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                      value={filters.trim}
                      onChange={(e: React.ChangeEvent<HTMLSelectElement>) => handleFilterChange("trim", e.target.value)}
                    >
                      <option value="">All Trims</option>
                      {trimOptions.filter(option => option !== "").map(trim => (
                        <option key={trim} value={trim}>{trim}</option>
                      ))}
                    </select>
                  </div>
                  
                  {(filters.angle || filters.color || filters.trim) && (
                    <div className="flex items-end">
                      <button 
                        onClick={() => setFilters({ angle: "", color: "", trim: "" })}
                        className="text-sm text-indigo-600 px-2 py-1.5 border border-indigo-200 bg-indigo-50 rounded-md hover:bg-indigo-100 transition-colors flex items-center"
                      >
                        <X className="w-4 h-4 mr-1" />
                        Clear Filters
                      </button>
                    </div>
                  )}
                </div>

                <div className="flex flex-wrap gap-4">
                  {/* Sort By Dropdown */}
                  <div className="flex flex-col">
                    <label className="text-sm text-gray-600 mb-1">Sort By</label>
                    <select 
                      className="border border-gray-300 rounded-md px-3 py-1.5 w-48 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                      value={sortBy}
                      onChange={(e: React.ChangeEvent<HTMLSelectElement>) => setSortBy(e.target.value as 'createdDate' | 'angle' | 'color' | 'trim')}
                    >
                      <option value="createdDate">Created Date</option>
                      <option value="angle">Angle</option>
                      <option value="color">Color</option>
                      <option value="trim">Trim</option>
                    </select>
                  </div>

                  {/* Sort Direction Dropdown */}
                  <div className="flex flex-col">
                    <label className="text-sm text-gray-600 mb-1">Direction</label>
                    <select 
                      className="border border-gray-300 rounded-md px-3 py-1.5 w-48 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                      value={sortDirection}
                      onChange={(e: React.ChangeEvent<HTMLSelectElement>) => setSortDirection(e.target.value as 'ASC' | 'DESC')}
                    >
                      <option value="ASC">Ascending</option>
                      <option value="DESC">Descending</option>
                    </select>
                  </div>
                </div>
              </div>
              
              {/* Filter status message */}
              {isColorFilterOnly && (
                <div className="text-indigo-600 text-sm mb-4 flex items-center">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="mr-1">
                    <path d="M12 8L12 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    <path d="M12 16.01L12 16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    <path d="M22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                  Drag and drop mode enabled. Reorder images by dragging them.
                </div>
              )}
              
              <div className="flex flex-wrap gap-6">
                {filteredCarViews.map((view) => (
                  <div 
                    key={view.id}
                    className={`border rounded-md overflow-hidden w-64 relative transition-all ${
                      selectedViews.includes(view.id) ? 'border-indigo-600 shadow-md' : 'hover:border-gray-300'
                    } ${isColorFilterOnly ? 'cursor-move' : ''}`}
                    draggable={isColorFilterOnly}
                    onDragStart={(e) => handleDragStart(e, view)}
                    onDragOver={(e) => handleDragOver(e, view)}
                    onDrop={(e) => handleDrop(e, view)}
                    onDragEnd={handleDragEnd}
                  >
                    {/* Checkbox */}
                    <div 
                      className="absolute top-2 right-2 z-10 w-6 h-6 border-2 rounded-md flex items-center justify-center cursor-pointer"
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleViewSelection(view.id);
                      }}
                    >
                      {selectedViews.includes(view.id) ? (
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M20 6L9 17L4 12" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                      ) : null}
                    </div>

                    {/* Order Number */}
                    <div className="absolute top-2 left-2 z-10 w-6 h-6 bg-gray-800 rounded-full flex items-center justify-center">
                      <span className="text-white text-xs font-medium">{view.order}</span>
                    </div>
                    
                    <div className="h-40 bg-gray-100 flex flex-col items-center justify-center">
                      <div className="w-full h-full flex items-center justify-center relative">
                        <img 
                          src={`/vehicles/${view.angle.split('°')[0]}_${view.color}.png`}
                          alt={`${view.color} ${view.viewType}`}
                          className="max-w-full max-h-full object-contain"
                          onError={(e) => {
                            // Fallback to a colored circle if image fails to load
                            const target = e.target as HTMLImageElement;
                            target.style.display = 'none';
                            const fallback = document.createElement('div');
                            fallback.className = `w-16 h-16 rounded-full flex items-center justify-center 
                              ${view.color === "Red" ? "bg-red-600 text-white" : 
                                view.color === "Green" ? "bg-green-600 text-white" : 
                                view.color === "Blue" ? "bg-blue-600 text-white" : 
                                "bg-indigo-100 text-indigo-600"}`;
                            fallback.innerHTML = `<span class="text-xl">${view.letter}</span>`;
                            target.parentNode?.appendChild(fallback);
                          }}
                        />
                        {defaultVehicles[view.color] === view.id && (
                          <div className="absolute bottom-2 left-2 bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-xs font-medium">
                            DEFAULT
                          </div>
                        )}
                      </div>
                    </div>
                    <div className="p-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                          <div className={`w-3 h-3 rounded-full ${
                            view.color === "Red" ? "bg-red-600" : 
                            view.color === "Green" ? "bg-green-600" : 
                            view.color === "Blue" ? "bg-blue-600" : 
                            "bg-indigo-100"
                          }`}></div>
                          <div className="text-sm font-medium">{view.color}</div>
                        </div>
                        <div className="text-sm text-gray-500 mt-1">Angle: <span className="text-gray-500">{view.angle}</span></div>  
                      </div>
                      <div className="text-sm text-gray-500">Trim: <span className="text-gray-500">{view.trim}</span></div>
                    </div>
                  </div>
                ))}
                
                {filteredCarViews.length === 0 && (
                  <div className="w-full p-12 flex justify-center items-center text-gray-500">
                    No vehicle images available
                  </div>
                )}
              </div>
            </div>
          </div>
        </main>
      </div>
      
      {/* --- Add Image Modal --- */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white rounded-lg shadow-xl p-6 w-full max-w-6xl h-[90vh] flex flex-col">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold">Add New Image for Hyundai All-New INSTER</h2>
              <button onClick={handleCancelAddModal} className="text-gray-500 hover:text-gray-700">
                <X className="w-5 h-5" />
              </button>
            </div>
            
            {/* Tabs */}
            <div className="border-b border-gray-200 mb-4">
              <nav className="-mb-px flex space-x-8">
                <button
                  onClick={() => setActiveTab('imagine')}
                  className={`border-b-2 py-4 px-1 text-sm font-medium ${
                    activeTab === 'imagine'
                      ? 'border-indigo-500 text-indigo-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  Imagine Studio
                </button>
                <button
                  onClick={() => setActiveTab('bank')}
                  className={`border-b-2 py-4 px-1 text-sm font-medium ${
                    activeTab === 'bank'
                      ? 'border-indigo-500 text-indigo-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  Image Bank
                </button>
              </nav>
            </div>

            {/* Tab Content */}
            <div className="flex-1 min-h-0">
              <div className="h-full overflow-y-auto">
                <div className="space-y-4">
                  {/* Imagine Studio Tab Content */}
                  <div className={activeTab === 'imagine' ? '' : 'hidden'}>
                    {/* Form Fields */}
                    <div className="space-y-4">
                      {/* Angle, Color, and Trim Dropdowns Row */}
                      <div className="flex gap-4">
                        {/* Year Dropdown */}
                        <div className="flex-1">
                          <label htmlFor="newYear" className="block text-sm font-medium text-gray-700 mb-1">Year of Manufacture</label>
                          <select
                            id="newYear"
                            value={newImageYear}
                            onChange={(e: React.ChangeEvent<HTMLSelectElement>) => {setNewImageYear(e.target.value); setPreviewData(null);}}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                          >
                            {yearOptions.map(option => (
                              <option key={option} value={option}>{option}</option>
                            ))}
                          </select>
                        </div>

                        {/* Angle Dropdown */}
                        <div className="flex-1">
                          <label htmlFor="newAngle" className="block text-sm font-medium text-gray-700 mb-1">Angle</label>
                          <select
                            id="newAngle"
                            value={newImageAngle}
                            onChange={(e: React.ChangeEvent<HTMLSelectElement>) => {setNewImageAngle(e.target.value); setPreviewData(null);}} // Reset preview on change
                            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                          >
                            {modalAngleOptions.map(option => (
                              <option key={option} value={option}>{option}</option>
                            ))}
                          </select>
                        </div>

                        {/* Color Dropdown */}
                        <div className="flex-1">
                          <label htmlFor="newColor" className="block text-sm font-medium text-gray-700 mb-1">Color</label>
                          <select
                            id="newColor"
                            value={newImageColor}
                            onChange={(e: React.ChangeEvent<HTMLSelectElement>) => {setNewImageColor(e.target.value); setPreviewData(null);}} // Reset preview on change
                            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                          >
                            <option value="" disabled>Select Color</option>
                            {modalColorOptions.map(option => (
                              <option key={option} value={option}>{option}</option>
                            ))}
                          </select>
                        </div>

                        {/* Trim Dropdown */}
                        <div className="flex-1">
                          <label htmlFor="newTrim" className="block text-sm font-medium text-gray-700 mb-1">Trim</label>
                          <select
                            id="newTrim"
                            value={newImageTrim}
                            onChange={(e: React.ChangeEvent<HTMLSelectElement>) => {setNewImageTrim(e.target.value); setPreviewData(null);}} // Reset preview on change
                            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                          >
                            <option value="" disabled>Select Trim</option>
                            {modalTrimOptions.map(option => (
                              <option key={option} value={option}>{option}</option>
                            ))}
                          </select>
                        </div>
                      </div>

                      {/* Image URL and Preview Button Row */}
                      <div>
                        <div className="flex items-start gap-4">
                          <div className="flex-1">
                            <label htmlFor="imageUrl" className="block text-sm font-medium text-gray-700 mb-1">Image URL</label>
                            <textarea
                              id="imageUrl"
                              readOnly
                              rows={4}
                              value={`https://cdn.imagin.studio/getImage?customer=tomorrowsjourney&make=hyundai&modelFamily=palisade&modelRange=palisade&modelVariant=od&modelYear=2023&paintId=${newImageColor.toLowerCase()}&angle=${newImageAngle.split('°')[0]}&tailoring=tomorrowsjourney&zoomlevel=1`}
                              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm bg-gray-50 text-sm font-mono resize-none"
                            />
                          </div>
                          <div className="pt-7">
                            <button
                              onClick={handlePreview}
                              type="button"
                              className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                            >
                              Preview
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="mt-4 h-48 border border-dashed border-gray-300 rounded-md flex items-center justify-center bg-gray-50">
                      {previewData ? (
                        // Render preview with actual vehicle image
                        <div className="w-full h-full flex items-center justify-center relative">
                          <img 
                            src={`/vehicles/${newImageAngle.split('°')[0]}_${newImageColor}.png`}
                            alt={`${newImageColor} ${previewData.viewType}`}
                            className="max-w-full max-h-full object-contain"
                            onError={(e) => {
                              // Fallback to a colored circle if image fails to load
                              const target = e.target as HTMLImageElement;
                              target.style.display = 'none';
                              const fallback = document.createElement('div');
                              fallback.className = `w-16 h-16 rounded-full flex items-center justify-center
                                ${newImageColor === "Red" ? "bg-red-600 text-white" :
                                  newImageColor === "Green" ? "bg-green-600 text-white" :
                                  newImageColor === "Blue" ? "bg-blue-600 text-white" :
                                  "bg-indigo-100 text-indigo-600"}`;
                              fallback.innerHTML = `<span class="text-xl">${previewData.letter}</span>`;
                              target.parentNode?.appendChild(fallback);
                            }}
                          />
                        </div>
                      ) : (
                        <p className="text-gray-400 text-sm">Preview will appear here</p>
                      )}
                    </div>
                  </div>

                  {/* Image Bank Tab Content */}
                  <div className={activeTab === 'bank' ? '' : 'hidden'}>
                    <div className="flex flex-wrap gap-4 items-end">
                      {/* Year Dropdown */}
                      <div className="flex-1">
                        <label htmlFor="imageBankYear" className="block text-sm font-medium text-gray-700 mb-1">Year of Manufacture</label>
                        <select
                          id="imageBankYear"
                          value={imageBankFilters.year}
                          onChange={(e: React.ChangeEvent<HTMLSelectElement>) => handleImageBankFilterChange("year", e.target.value)}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        >
                          <option value="">All Years</option>
                          {yearOptions.map(option => (
                            <option key={option} value={option}>{option}</option>
                          ))}
                        </select>
                      </div>

                      {/* Color Dropdown */}
                      <div className="flex-1">
                        <label htmlFor="imageBankColor" className="block text-sm font-medium text-gray-700 mb-1">Color</label>
                        <select
                          id="imageBankColor"
                          value={imageBankFilters.color}
                          onChange={(e: React.ChangeEvent<HTMLSelectElement>) => handleImageBankFilterChange("color", e.target.value)}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        >
                          <option value="">All Colors</option>
                          {imageBankColorOptions.map(option => (
                            <option key={option} value={option}>{option}</option>
                          ))}
                        </select>
                      </div>

                      {/* Angle Dropdown */}
                      <div className="flex-1">
                        <label htmlFor="imageBankAngle" className="block text-sm font-medium text-gray-700 mb-1">Angle</label>
                        <select
                          id="imageBankAngle"
                          value={imageBankFilters.angle}
                          onChange={(e: React.ChangeEvent<HTMLSelectElement>) => handleImageBankFilterChange("angle", e.target.value)}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        >
                          <option value="">All Angles</option>
                          {imageBankAngleOptions.map(option => (
                            <option key={option} value={option}>{option}</option>
                          ))}
                        </select>
                      </div>

                      {/* Search Button */}
                      <div>
                        <button
                          type="button"
                          onClick={handleImageBankSearch}
                          className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                        >
                          Search
                        </button>
                      </div>
                    </div>

                    {/* Results area */}
                    <div className="mt-6">
                      {imageBankResults.length > 0 ? (
                        <div className="flex flex-wrap gap-6">
                          {imageBankResults.map((view) => (
                            <div 
                              key={view.id}
                              className={`border rounded-md overflow-hidden w-64 relative cursor-pointer transition-all ${
                                selectedImageBankItems.includes(view.id) ? 'border-indigo-600 shadow-md' : 'hover:border-gray-300'
                              }`}
                              onClick={() => toggleImageBankSelection(view.id)}
                            >
                              {selectedImageBankItems.includes(view.id) && (
                                <div className="absolute top-2 right-2 z-10 w-6 h-6 bg-indigo-600 rounded-full flex items-center justify-center">
                                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M20 6L9 17L4 12" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
                                  </svg>
                                </div>
                              )}
                              <div className="h-40 bg-gray-100 flex flex-col items-center justify-center">
                                <div className="w-full h-full flex items-center justify-center">
                                  <img 
                                    src={`/vehicles/${view.angle.split('°')[0]}_${view.color}.png`}
                                    alt={`${view.color} ${view.viewType}`}
                                    className="max-w-full max-h-full object-contain"
                                    onError={(e) => {
                                      // Fallback to a colored circle if image fails to load
                                      const target = e.target as HTMLImageElement;
                                      target.style.display = 'none';
                                      const fallback = document.createElement('div');
                                      fallback.className = `w-16 h-16 rounded-full flex items-center justify-center 
                                        ${view.color === "Red" ? "bg-red-600 text-white" : 
                                          view.color === "Green" ? "bg-green-600 text-white" : 
                                          view.color === "Blue" ? "bg-blue-600 text-white" : 
                                          "bg-indigo-100 text-indigo-600"}`;
                                      fallback.innerHTML = `<span class="text-xl">${view.letter}</span>`;
                                      target.parentNode?.appendChild(fallback);
                                    }}
                                  />
                                </div>
                              </div>
                              <div className="p-3 space-y-1">
                                <p className="text-sm"><span className="font-medium">Angle:</span> {view.angle}</p>
                                <p className="text-sm"><span className="font-medium">Color:</span> {view.color}</p>
                                <p className="text-sm"><span className="font-medium">Trim:</span> {view.trim}</p>
                              </div>
                            </div>
                          ))}
                        </div>
                      ) : (
                        <div className="text-center text-gray-500">
                          {imageBankResults.length === 0 ? "Search results will appear here" : "No results found"}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Modal Footer Buttons */}
            <div className="mt-6 flex justify-end space-x-3 border-t pt-4">
              <button
                onClick={handleCancelAddModal}
                type="button"
                className="px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
              >
                Cancel
              </button>
              <button
                onClick={handleSaveImage}
                type="button"
                className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}
      {/* --- End of Add Image Modal --- */}
    </div>
  );
};

export default FleetManagementDashboard;
