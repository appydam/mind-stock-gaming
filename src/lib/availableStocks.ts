import { Stock } from "@/components/StockSelector";

const availableStocks: Stock[] = [
    {
        "symbol": "CHENNPETRO",
        "name": "Chennai Petroleum Corporation Ltd.",
        "sector": "Refineries"
    },
    {
        "symbol": "CASTROLIND",
        "name": "Castrol India Ltd.",
        "sector": "Lubricants"
    },
    {
        "symbol": "JYOTICNC",
        "name": "Jyoti CNC Automation Ltd.",
        "sector": "Engineering - Industrial Equipments"
    },
    {
        "symbol": "GPIL",
        "name": "Godawari Power And Ispat Ltd.",
        "sector": "Steel & Iron Products"
    },
    {
        "symbol": "NEOGEN",
        "name": "Neogen Chemicals Ltd.",
        "sector": "Chemicals"
    },
    {
        "symbol": "GRWRHITECH",
        "name": "Garware Hi-Tech Films Ltd.",
        "sector": "Plastic Products"
    },
    {
        "symbol": "JINDALSAW",
        "name": "Jindal Saw Ltd.",
        "sector": "Steel & Iron Products"
    },
    {
        "symbol": "LANDMARK",
        "name": "Landmark Cars Ltd.",
        "sector": "Automobiles - Dealers & Distributors"
    },
    {
        "symbol": "LLOYDSME",
        "name": "Lloyds Metals & Energy Ltd.",
        "sector": "Steel/Sponge Iron/Pig Iron"
    },
    {
        "symbol": "CHEMPLASTS",
        "name": "Chemplast Sanmar Ltd.",
        "sector": "Chemicals"
    },
    {
        "symbol": "RELINFRA",
        "name": "Reliance Infrastructure Ltd.",
        "sector": "Power Generation/Distribution"
    },
    {
        "symbol": "VEEDOL",
        "name": "Veedol Corporation Ltd.",
        "sector": "Lubricants"
    },
    {
        "symbol": "RAMKY",
        "name": "Ramky Infrastructure Ltd.",
        "sector": "Engineering - Construction"
    },
    {
        "symbol": "JISLJALEQS",
        "name": "Jain Irrigation Systems Ltd.",
        "sector": "Plastic Products"
    },
    {
        "symbol": "SANDUMA",
        "name": "Sandur Manganese & Iron Ores Ltd.",
        "sector": "Mining & Minerals"
    },
    {
        "symbol": "TRITURBINE",
        "name": "Triveni Turbine Ltd.",
        "sector": "Engineering - Industrial Equipments"
    },
    {
        "symbol": "ESAFSFB",
        "name": "ESAF Small Finance Bank Ltd.",
        "sector": "Bank - Private"
    },
    {
        "symbol": "CREDITACC",
        "name": "CreditAccess Grameen Ltd.",
        "sector": "Finance - NBFC"
    },
    {
        "symbol": "MARKSANS",
        "name": "Marksans Pharma Ltd.",
        "sector": "Pharmaceuticals & Drugs"
    },
    {
        "symbol": "JSWINFRA",
        "name": "JSW Infrastructure Ltd.",
        "sector": "Port"
    },
    {
        "symbol": "PRUDENT",
        "name": "Prudent Corporate Advisory Services Ltd.",
        "sector": "Finance - Others"
    },
    {
        "symbol": "AMBER",
        "name": "Amber Enterprises India Ltd.",
        "sector": "Air Conditioners"
    },
    {
        "symbol": "MRPL",
        "name": "Mangalore Refinery And Petrochemicals Ltd.",
        "sector": "Refineries"
    },
    {
        "symbol": "KTKBANK",
        "name": "The Karnataka Bank Ltd.",
        "sector": "Bank - Private"
    },
    {
        "symbol": "JSL",
        "name": "Jindal Stainless Ltd.",
        "sector": "Steel & Iron Products"
    },
    {
        "symbol": "JAIBALAJI",
        "name": "Jai Balaji Industries Ltd.",
        "sector": "Steel/Sponge Iron/Pig Iron"
    },
    {
        "symbol": "KIRLOSENG",
        "name": "Kirloskar Oil Engines Ltd.",
        "sector": "Engineering - Industrial Equipments"
    },
    {
        "symbol": "IPL",
        "name": "India Pesticides Ltd.",
        "sector": "Pesticides & Agrochemicals"
    },
    {
        "symbol": "PAISALO",
        "name": "Paisalo Digital Ltd.",
        "sector": "Finance - NBFC"
    },
    {
        "symbol": "NOCIL",
        "name": "Nocil Ltd.",
        "sector": "Chemicals"
    },
    {
        "symbol": "UJJIVANSFB",
        "name": "Ujjivan Small Finance Bank Ltd.",
        "sector": "Bank - Private"
    },
    {
        "symbol": "EPL",
        "name": "EPL Ltd.",
        "sector": "Plastic Products"
    },
    {
        "symbol": "SBCL",
        "name": "Shivalik Bimetal Controls Ltd.",
        "sector": "Metal - Non Ferrous"
    },
    {
        "symbol": "SPLPETRO",
        "name": "Supreme Petrochem Ltd.",
        "sector": "Chemicals"
    },
    {
        "symbol": "GATEWAY",
        "name": "Gateway Distriparks Ltd.",
        "sector": "Logistics"
    },
    {
        "symbol": "ARVIND",
        "name": "Arvind Ltd.",
        "sector": "Textile"
    },
    {
        "symbol": "PTCIL",
        "name": "PTC Industries Ltd.",
        "sector": "Castings/Forgings"
    },
    {
        "symbol": "GODFRYPHLP",
        "name": "Godfrey Phillips India Ltd.",
        "sector": "Cigarettes/Tobacco"
    },
    {
        "symbol": "ASKAUTOLTD",
        "name": "ASK Automotive Ltd.",
        "sector": "Auto Ancillary"
    },
    {
        "symbol": "SUNFLAG",
        "name": "Sunflag Iron And Steel Company Ltd.",
        "sector": "Steel & Iron Products"
    },
    {
        "symbol": "JUBLINGREA",
        "name": "Jubilant Ingrevia Ltd.",
        "sector": "Chemicals"
    },
    {
        "symbol": "DATAMATICS",
        "name": "Datamatics Global Services Ltd.",
        "sector": "IT - Software"
    },
    {
        "symbol": "STYLAMIND",
        "name": "Stylam Industries Ltd.",
        "sector": "Laminates/Decoratives"
    },
    {
        "symbol": "TARC",
        "name": "TARC Ltd.",
        "sector": "Construction - Real Estate"
    },
    {
        "symbol": "BOROLTD",
        "name": "Borosil Ltd.",
        "sector": "Consumer Durables - Domestic Appliances"
    },
    {
        "symbol": "EASEMYTRIP",
        "name": "Easy Trip Planners Ltd.",
        "sector": "Travel Services"
    },
    {
        "symbol": "ASIANPAINT",
        "name": "Asian Paints Ltd.",
        "sector": "Paints"
    },
    {
        "symbol": "CAPLIPOINT",
        "name": "Caplin Point Laboratories Ltd.",
        "sector": "Pharmaceuticals & Drugs"
    },
    {
        "symbol": "GRINDWELL",
        "name": "Grindwell Norton Ltd.",
        "sector": "Abrasives"
    },
    {
        "symbol": "TBOTEK",
        "name": "TBO Tek Ltd.",
        "sector": "Travel Services"
    },
    {
        "symbol": "WSTCSTPAPR",
        "name": "West Coast Paper Mills Ltd.",
        "sector": "Paper & Paper Products"
    },
    {
        "symbol": "VARROC",
        "name": "Varroc Engineering Ltd.",
        "sector": "Auto Ancillary"
    },
    {
        "symbol": "HINDWAREAP",
        "name": "Hindware Home Innovation Ltd.",
        "sector": "Consumer Durables - Domestic Appliances"
    },
    {
        "symbol": "TIRUMALCHM",
        "name": "Thirumalai Chemicals Ltd.",
        "sector": "Chemicals"
    },
    {
        "symbol": "GRAPHITE",
        "name": "Graphite India Ltd.",
        "sector": "Electrodes & Welding Equipment"
    },
    {
        "symbol": "UTIAMC",
        "name": "UTI Asset Management Company Ltd.",
        "sector": "Finance - Asset Management"
    },
    {
        "symbol": "BANCOINDIA",
        "name": "Banco Products (India) Ltd.",
        "sector": "Auto Ancillary"
    },
    {
        "symbol": "NAVA",
        "name": "Nava Ltd.",
        "sector": "Power Generation/Distribution"
    },
    {
        "symbol": "SAPPHIRE",
        "name": "Sapphire Foods India Ltd.",
        "sector": "Consumer Food"
    },
    {
        "symbol": "DOMS",
        "name": "DOMS Industries Ltd.",
        "sector": "Printing & Stationery"
    },
    {
        "symbol": "RADICO",
        "name": "Radico Khaitan Ltd.",
        "sector": "Breweries & Distilleries"
    },
    {
        "symbol": "KSL",
        "name": "Kalyani Steels Ltd.",
        "sector": "Steel & Iron Products"
    },
    {
        "symbol": "POLYMED",
        "name": "Poly Medicure Ltd.",
        "sector": "Medical Equipment/Supplies/Accessories"
    },
    {
        "symbol": "CENTURYPLY",
        "name": "Century Plyboards (India) Ltd.",
        "sector": "Wood & Wood Products"
    },
    {
        "symbol": "POLYPLEX",
        "name": "Polyplex Corporation Ltd.",
        "sector": "Plastic Products"
    },
    {
        "symbol": "RHIM",
        "name": "RHI Magnesita India Ltd.",
        "sector": "Refractories"
    },
    {
        "symbol": "JUSTDIAL",
        "name": "Just Dial Ltd.",
        "sector": "Business Support"
    },
    {
        "symbol": "THOMASCOOK",
        "name": "Thomas Cook (India) Ltd.",
        "sector": "Travel Services"
    },
    {
        "symbol": "ZENTEC",
        "name": "Zen Technologies Ltd.",
        "sector": "Defence"
    },
    {
        "symbol": "MGL",
        "name": "Mahanagar Gas Ltd.",
        "sector": "Gas Transmission/Marketing"
    },
    {
        "symbol": "MOIL",
        "name": "MOIL Ltd.",
        "sector": "Mining & Minerals"
    },
    {
        "symbol": "GRAVITA",
        "name": "Gravita India Ltd.",
        "sector": "Metal - Non Ferrous"
    },
    {
        "symbol": "AGI",
        "name": "AGI Greenpac Ltd.",
        "sector": "Packaging"
    },
    {
        "symbol": "SPANDANA",
        "name": "Spandana Sphoorty Financial Ltd.",
        "sector": "Finance - NBFC"
    },
    {
        "symbol": "ZENSARTECH",
        "name": "Zensar Technologies Ltd.",
        "sector": "IT - Software"
    },
    {
        "symbol": "KRBL",
        "name": "KRBL Ltd.",
        "sector": "Consumer Food"
    },
    {
        "symbol": "GREENPANEL",
        "name": "Greenpanel Industries Ltd.",
        "sector": "Wood & Wood Products"
    },
    {
        "symbol": "SHRIPISTON",
        "name": "Shriram Pistons & Rings Ltd",
        "sector": "Engineering - Industrial Equipments"
    },
    {
        "symbol": "CONFIPET",
        "name": "Confidence Petroleum India Ltd.",
        "sector": "Industrial  Gases & Fuels"
    },
    {
        "symbol": "GANESHHOUC",
        "name": "Ganesh Housing Corporation Ltd.",
        "sector": "Construction - Real Estate"
    },
    {
        "symbol": "RAYMOND",
        "name": "Raymond Ltd.",
        "sector": "Textile - Weaving"
    },
    {
        "symbol": "ALIVUS",
        "name": "Alivus Life Sciences Ltd.",
        "sector": "Pharmaceuticals & Drugs"
    },
    {
        "symbol": "HINDZINC",
        "name": "Hindustan Zinc Ltd.",
        "sector": "Metal - Non Ferrous"
    },
    {
        "symbol": "MMTC",
        "name": "MMTC Ltd.",
        "sector": "Trading"
    },
    {
        "symbol": "GAEL",
        "name": "Gujarat Ambuja Exports Ltd.",
        "sector": "Solvent  Extraction"
    },
    {
        "symbol": "SUNTECK",
        "name": "Sunteck Realty Ltd.",
        "sector": "Construction - Real Estate"
    },
    {
        "symbol": "COALINDIA",
        "name": "Coal India Ltd.",
        "sector": "Mining & Minerals"
    },
    {
        "symbol": "LLOYDSENGG",
        "name": "Lloyds Engineering Works Ltd.",
        "sector": "Engineering - Industrial Equipments"
    },
    {
        "symbol": "ERIS",
        "name": "Eris Lifesciences Ltd.",
        "sector": "Pharmaceuticals & Drugs"
    },
    {
        "symbol": "POWERMECH",
        "name": "Power Mech Projects Ltd.",
        "sector": "Engineering - Construction"
    },
    {
        "symbol": "SUNDRMFAST",
        "name": "Sundram Fasteners Ltd.",
        "sector": "Fasteners"
    },
    {
        "symbol": "GODREJCP",
        "name": "Godrej Consumer Products Ltd.",
        "sector": "Household & Personal Products"
    },
    {
        "symbol": "DCXINDIA",
        "name": "DCX Systems Ltd.",
        "sector": "Electronics - Components"
    },
    {
        "symbol": "HINDPETRO",
        "name": "Hindustan Petroleum Corporation Ltd.",
        "sector": "Refineries"
    },
    {
        "symbol": "KOLTEPATIL",
        "name": "Kolte-Patil Developers Ltd.",
        "sector": "Construction - Real Estate"
    },
    {
        "symbol": "HIKAL",
        "name": "Hikal Ltd.",
        "sector": "Pharmaceuticals & Drugs"
    },
    {
        "symbol": "KALAMANDIR",
        "name": "Sai Silks (Kalamandir) Ltd.",
        "sector": "Retailing"
    },
    {
        "symbol": "SUMICHEM",
        "name": "Sumitomo Chemical India Ltd.",
        "sector": "Pesticides & Agrochemicals"
    },
    {
        "symbol": "ADANIENSOL",
        "name": "Adani Energy Solutions Ltd.",
        "sector": "Power Generation/Distribution"
    },
    {
        "symbol": "YATHARTH",
        "name": "Yatharth Hospital & Trauma Care Services Ltd.",
        "sector": "Hospital & Healthcare Services"
    },
    {
        "symbol": "WELCORP",
        "name": "Welspun Corp Ltd.",
        "sector": "Steel & Iron Products"
    },
    {
        "symbol": "ECLERX",
        "name": "eClerx Services Ltd.",
        "sector": "BPO/ITeS"
    },
    {
        "symbol": "RATNAMANI",
        "name": "Ratnamani Metals & Tubes Ltd.",
        "sector": "Steel & Iron Products"
    },
    {
        "symbol": "BPCL",
        "name": "Bharat Petroleum Corporation Ltd.",
        "sector": "Refineries"
    },
    {
        "symbol": "IIFL",
        "name": "IIFL Finance Ltd.",
        "sector": "Finance - Investment"
    },
    {
        "symbol": "MEDANTA",
        "name": "Global Health Ltd.",
        "sector": "Hospital & Healthcare Services"
    },
    {
        "symbol": "HINDALCO",
        "name": "Hindalco Industries Ltd.",
        "sector": "Metal - Non Ferrous"
    },
    {
        "symbol": "ROSSARI",
        "name": "Rossari Biotech Ltd.",
        "sector": "Chemicals"
    },
    {
        "symbol": "GABRIEL",
        "name": "Gabriel India Ltd.",
        "sector": "Auto Ancillary"
    },
    {
        "symbol": "SOUTHBANK",
        "name": "The South Indian Bank Ltd.",
        "sector": "Bank - Private"
    },
    {
        "symbol": "LTFOODS",
        "name": "LT Foods Ltd.",
        "sector": "Consumer Food"
    },
    {
        "symbol": "LALPATHLAB",
        "name": "Dr. Lal Pathlabs Ltd.",
        "sector": "Hospital & Healthcare Services"
    },
    {
        "symbol": "ORISSAMINE",
        "name": "The Orissa Minerals Development Company Ltd.",
        "sector": "Mining & Minerals"
    },
    {
        "symbol": "VENUSPIPES",
        "name": "Venus Pipes & Tubes Ltd.",
        "sector": "Steel & Iron Products"
    },
    {
        "symbol": "JUNIPER",
        "name": "Juniper Hotels Ltd.",
        "sector": "Hotel, Resort & Restaurants"
    },
    {
        "symbol": "CAMS",
        "name": "Computer Age Management Services Ltd.",
        "sector": "Depository Services"
    },
    {
        "symbol": "GLAND",
        "name": "Gland Pharma Ltd.",
        "sector": "Pharmaceuticals & Drugs"
    },
    {
        "symbol": "GMDCLTD",
        "name": "Gujarat Mineral Development Corporation Ltd.",
        "sector": "Mining & Minerals"
    },
    {
        "symbol": "PIIND",
        "name": "PI Industries Ltd.",
        "sector": "Pesticides & Agrochemicals"
    },
    {
        "symbol": "JKIL",
        "name": "J Kumar Infraprojects Ltd.",
        "sector": "Engineering - Construction"
    },
    {
        "symbol": "NRBBEARING",
        "name": "NRB Bearings Ltd.",
        "sector": "Bearings"
    },
    {
        "symbol": "TDPOWERSYS",
        "name": "TD Power Systems Ltd.",
        "sector": "Electric Equipment"
    },
    {
        "symbol": "STARCEMENT",
        "name": "Star Cement Ltd.",
        "sector": "Cement & Construction Materials"
    },
    {
        "symbol": "INTELLECT",
        "name": "Intellect Design Arena Ltd.",
        "sector": "IT - Software"
    },
    {
        "symbol": "PGEL",
        "name": "PG Electroplast Ltd.",
        "sector": "Consumer Durables - Domestic Appliances"
    },
    {
        "symbol": "BERGEPAINT",
        "name": "Berger Paints India Ltd.",
        "sector": "Paints"
    },
    {
        "symbol": "PRINCEPIPE",
        "name": "Prince Pipes and Fittings Ltd.",
        "sector": "Plastic Products"
    },
    {
        "symbol": "GESHIP",
        "name": "The Great Eastern Shipping Company Ltd.",
        "sector": "Shipping"
    },
    {
        "symbol": "VBL",
        "name": "Varun Beverages Ltd.",
        "sector": "Consumer Food"
    },
    {
        "symbol": "KIRLOSBROS",
        "name": "Kirloskar Brothers Ltd.",
        "sector": "Engineering - Industrial Equipments"
    },
    {
        "symbol": "IGL",
        "name": "Indraprastha Gas Ltd.",
        "sector": "Gas Transmission/Marketing"
    },
    {
        "symbol": "KPITTECH",
        "name": "KPIT Technologies Ltd.",
        "sector": "IT - Software"
    },
    {
        "symbol": "HEG",
        "name": "HEG Ltd.",
        "sector": "Electrodes & Welding Equipment"
    },
    {
        "symbol": "IEX",
        "name": "Indian Energy Exchange Ltd.",
        "sector": "Power Generation/Distribution"
    },
    {
        "symbol": "KIMS",
        "name": "Krishna Institute of Medical Sciences Ltd",
        "sector": "Hospital & Healthcare Services"
    },
    {
        "symbol": "RELIANCE",
        "name": "Reliance Industries Ltd.",
        "sector": "Refineries"
    },
    {
        "symbol": "WONDERLA",
        "name": "Wonderla Holidays Ltd.",
        "sector": "Amusement Parks/Recreation/Club"
    },
    {
        "symbol": "ZYDUSWELL",
        "name": "Zydus Wellness Ltd.",
        "sector": "Consumer Food"
    },
    {
        "symbol": "NTPC",
        "name": "NTPC Ltd.",
        "sector": "Power Generation/Distribution"
    },
    {
        "symbol": "LXCHEM",
        "name": "Laxmi Organic Industries Ltd.",
        "sector": "Chemicals"
    },
    {
        "symbol": "MARICO",
        "name": "Marico Ltd.",
        "sector": "Consumer Food"
    },
    {
        "symbol": "EQUITASBNK",
        "name": "Equitas Small Finance Bank Ltd.",
        "sector": "Bank - Private"
    },
    {
        "symbol": "VEDL",
        "name": "Vedanta Ltd.",
        "sector": "Metal - Non Ferrous"
    },
    {
        "symbol": "NETWEB",
        "name": "Netweb Technologies India Ltd.",
        "sector": "IT - Hardware"
    },
    {
        "symbol": "CDSL",
        "name": "Central Depository Services (India) Ltd.",
        "sector": "Depository Services"
    },
    {
        "symbol": "MASTEK",
        "name": "Mastek Ltd.",
        "sector": "IT - Software"
    },
    {
        "symbol": "ORIENTELEC",
        "name": "Orient Electric Ltd.",
        "sector": "Consumer Durables - Domestic Appliances"
    },
    {
        "symbol": "AADHARHFC",
        "name": "Aadhar Housing Finance Ltd.",
        "sector": "Finance - Housing"
    },
    {
        "symbol": "HATHWAY",
        "name": "Hathway Cable & Datacom Ltd.",
        "sector": "Telecommunication - Service  Provider"
    },
    {
        "symbol": "VMART",
        "name": "V-Mart Retail Ltd.",
        "sector": "Retailing"
    },
    {
        "symbol": "ENDURANCE",
        "name": "Endurance Technologies Ltd.",
        "sector": "Auto Ancillary"
    },
    {
        "symbol": "MIDHANI",
        "name": "Mishra Dhatu Nigam Ltd.",
        "sector": "Steel & Iron Products"
    },
    {
        "symbol": "SUDARSCHEM",
        "name": "Sudarshan Chemical Industries Ltd.",
        "sector": "Dyes & Pigments"
    },
    {
        "symbol": "WOCKPHARMA",
        "name": "Wockhardt Ltd.",
        "sector": "Pharmaceuticals & Drugs"
    },
    {
        "symbol": "ROUTE",
        "name": "Route Mobile Ltd.",
        "sector": "IT - Software"
    },
    {
        "symbol": "CIPLA",
        "name": "Cipla Ltd.",
        "sector": "Pharmaceuticals & Drugs"
    },
    {
        "symbol": "DCBBANK",
        "name": "DCB Bank Ltd.",
        "sector": "Bank - Private"
    },
    {
        "symbol": "MOTHERSON",
        "name": "Samvardhana Motherson International Ltd.",
        "sector": "Auto Ancillary"
    },
    {
        "symbol": "BHARATFORG",
        "name": "Bharat Forge Ltd.",
        "sector": "Forgings"
    },
    {
        "symbol": "PVRINOX",
        "name": "PVR Inox Ltd.",
        "sector": "Film Production, Distribution & Entertainment"
    },
    {
        "symbol": "APOLLOTYRE",
        "name": "Apollo Tyres Ltd.",
        "sector": "Tyres & Allied"
    },
    {
        "symbol": "SHILPAMED",
        "name": "Shilpa Medicare Ltd.",
        "sector": "Pharmaceuticals & Drugs"
    },
    {
        "symbol": "GHCL",
        "name": "GHCL Ltd.",
        "sector": "Chemicals"
    },
    {
        "symbol": "USHAMART",
        "name": "Usha Martin Ltd.",
        "sector": "Steel & Iron Products"
    },
    {
        "symbol": "TATAINVEST",
        "name": "Tata Investment Corporation Ltd.",
        "sector": "Finance - NBFC"
    },
    {
        "symbol": "UTKARSHBNK",
        "name": "Utkarsh Small Finance Bank Ltd.",
        "sector": "Bank - Private"
    },
    {
        "symbol": "TIPSMUSIC",
        "name": "Tips Music Ltd.",
        "sector": "Film Production, Distribution & Entertainment"
    },
    {
        "symbol": "POWERINDIA",
        "name": "Hitachi Energy India Ltd.",
        "sector": "Electric Equipment"
    },
    {
        "symbol": "FCL",
        "name": "Fineotex Chemical Ltd.",
        "sector": "Chemicals"
    },
    {
        "symbol": "TANLA",
        "name": "Tanla Platforms Ltd.",
        "sector": "IT - Software"
    },
    {
        "symbol": "CAMPUS",
        "name": "Campus Activewear Ltd.",
        "sector": "Footwear"
    },
    {
        "symbol": "EDELWEISS",
        "name": "Edelweiss Financial Services Ltd.",
        "sector": "Finance - NBFC"
    },
    {
        "symbol": "MAHLIFE",
        "name": "Mahindra Lifespace Developers Ltd.",
        "sector": "Construction - Real Estate"
    },
    {
        "symbol": "VESUVIUS",
        "name": "Vesuvius India Ltd.",
        "sector": "Refractories"
    },
    {
        "symbol": "HUDCO",
        "name": "Housing & Urban Development Corporation Ltd.",
        "sector": "Finance - Housing"
    },
    {
        "symbol": "IOC",
        "name": "Indian Oil Corporation Ltd.",
        "sector": "Refineries"
    },
    {
        "symbol": "GOPAL",
        "name": "Gopal Snacks Ltd.",
        "sector": "Consumer Food"
    },
    {
        "symbol": "ASAHIINDIA",
        "name": "Asahi India Glass Ltd.",
        "sector": "Glass"
    },
    {
        "symbol": "SINDHUTRAD",
        "name": "Sindhu Trade Links Ltd.",
        "sector": "Finance - NBFC"
    },
    {
        "symbol": "VIJAYA",
        "name": "Vijaya Diagnostic Centre Ltd.",
        "sector": "Hospital & Healthcare Services"
    },
    {
        "symbol": "REDTAPE",
        "name": "Redtape Ltd.",
        "sector": "Retailing"
    },
    {
        "symbol": "JCHAC",
        "name": "Johnson Controls - Hitachi Air Conditioning India Ltd.",
        "sector": "Air Conditioners"
    },
    {
        "symbol": "HINDCOPPER",
        "name": "Hindustan Copper Ltd.",
        "sector": "Metal - Non Ferrous"
    },
    {
        "symbol": "ZFCVINDIA",
        "name": "ZF Commercial Vehicle Control Systems India Ltd.",
        "sector": "Auto Ancillary"
    },
    {
        "symbol": "AHLUCONT",
        "name": "Ahluwalia Contracts (India) Ltd.",
        "sector": "Construction - Real Estate"
    },
    {
        "symbol": "HONASA",
        "name": "Honasa Consumer Ltd.",
        "sector": "Trading"
    },
    {
        "symbol": "GULFOILLUB",
        "name": "Gulf Oil Lubricants India Ltd.",
        "sector": "Lubricants"
    },
    {
        "symbol": "KPRMILL",
        "name": "K.P.R. Mill Ltd.",
        "sector": "Textile"
    },
    {
        "symbol": "CIEINDIA",
        "name": "CIE Automotive India Ltd.",
        "sector": "Forgings"
    },
    {
        "symbol": "NSLNISP",
        "name": "NMDC Steel Ltd.",
        "sector": "Steel & Iron Products"
    },
    {
        "symbol": "MHRIL",
        "name": "Mahindra Holidays & Resorts India Ltd.",
        "sector": "Hotel, Resort & Restaurants"
    },
    {
        "symbol": "TATASTEEL",
        "name": "Tata Steel Ltd.",
        "sector": "Steel & Iron Products"
    },
    {
        "symbol": "TORNTPHARM",
        "name": "Torrent Pharmaceuticals Ltd.",
        "sector": "Pharmaceuticals & Drugs"
    },
    {
        "symbol": "SURYAROSNI",
        "name": "Surya Roshni Ltd.",
        "sector": "Diversified"
    },
    {
        "symbol": "HERITGFOOD",
        "name": "Heritage Foods Ltd.",
        "sector": "Consumer Food"
    },
    {
        "symbol": "JUBLPHARMA",
        "name": "Jubilant Pharmova Ltd.",
        "sector": "Pharmaceuticals & Drugs"
    },
    {
        "symbol": "DEEPAKFERT",
        "name": "Deepak Fertilisers And Petrochemicals Corporation Ltd.",
        "sector": "Fertilizers"
    },
    {
        "symbol": "IMFA",
        "name": "Indian Metals & Ferro Alloys Ltd.",
        "sector": "Ferro & Silica Manganese"
    },
    {
        "symbol": "IRFC",
        "name": "Indian Railway Finance Corporation Ltd.",
        "sector": "Finance Term Lending"
    },
    {
        "symbol": "HONAUT",
        "name": "Honeywell Automation India Ltd.",
        "sector": "Consumer Durables - Electronics"
    },
    {
        "symbol": "SYRMA",
        "name": "Syrma SGS Technology Ltd.",
        "sector": "Electronics - Components"
    },
    {
        "symbol": "IDEAFORGE",
        "name": "Ideaforge Technology Ltd.",
        "sector": "Engineering - Industrial Equipments"
    },
    {
        "symbol": "RBLBANK",
        "name": "RBL Bank Ltd.",
        "sector": "Bank - Private"
    },
    {
        "symbol": "BEPL",
        "name": "Bhansali Engineering Polymers Ltd.",
        "sector": "Chemicals"
    },
    {
        "symbol": "HINDUNILVR",
        "name": "Hindustan Unilever Ltd.",
        "sector": "Household & Personal Products"
    },
    {
        "symbol": "UNOMINDA",
        "name": "UNO Minda Ltd.",
        "sector": "Auto Ancillary"
    },
    {
        "symbol": "JKLAKSHMI",
        "name": "JK Lakshmi Cement Ltd.",
        "sector": "Cement & Construction Materials"
    },
    {
        "symbol": "VINATIORGA",
        "name": "Vinati Organics Ltd.",
        "sector": "Chemicals"
    },
    {
        "symbol": "ICIL",
        "name": "Indo Count Industries Ltd.",
        "sector": "Textile"
    },
    {
        "symbol": "NYKAA",
        "name": "FSN E-Commerce Ventures Ltd.",
        "sector": "e-Commerce"
    },
    {
        "symbol": "RECLTD",
        "name": "REC Ltd.",
        "sector": "Finance Term Lending"
    },
    {
        "symbol": "MUTHOOTFIN",
        "name": "Muthoot Finance Ltd.",
        "sector": "Finance - NBFC"
    },
    {
        "symbol": "MSTCLTD",
        "name": "MSTC Ltd.",
        "sector": "Trading"
    },
    {
        "symbol": "NETWORK18",
        "name": "Network 18 Media & Investments Ltd.",
        "sector": "TV Broadcasting & Software Production"
    },
    {
        "symbol": "CGPOWER",
        "name": "CG Power and Industrial Solutions Ltd.",
        "sector": "Electric Equipment"
    },
    {
        "symbol": "EIDPARRY",
        "name": "E.I.D. - Parry (India) Ltd.",
        "sector": "Sugar"
    },
    {
        "symbol": "WELSPUNLIV",
        "name": "Welspun Living Ltd.",
        "sector": "Textile"
    },
    {
        "symbol": "PFC",
        "name": "Power Finance Corporation Ltd.",
        "sector": "Finance Term Lending"
    },
    {
        "symbol": "BAJAJFINSV",
        "name": "Bajaj Finserv Ltd.",
        "sector": "Finance - Investment"
    },
    {
        "symbol": "NLCINDIA",
        "name": "NLC India Ltd.",
        "sector": "Power Generation/Distribution"
    },
    {
        "symbol": "RAIN",
        "name": "Rain Industries Ltd.",
        "sector": "Petrochemicals"
    },
    {
        "symbol": "JKPAPER",
        "name": "JK Paper Ltd.",
        "sector": "Paper & Paper Products"
    },
    {
        "symbol": "SEQUENT",
        "name": "Sequent Scientific Ltd.",
        "sector": "Pharmaceuticals & Drugs"
    },
    {
        "symbol": "JINDALSTEL",
        "name": "Jindal Steel & Power Ltd.",
        "sector": "Steel/Sponge Iron/Pig Iron"
    },
    {
        "symbol": "BAJAJHIND",
        "name": "Bajaj Hindusthan Sugar Ltd.",
        "sector": "Sugar"
    },
    {
        "symbol": "IMAGICAA",
        "name": "Imagicaaworld Entertainment Ltd.",
        "sector": "Amusement Parks/Recreation/Club"
    },
    {
        "symbol": "DCAL",
        "name": "Dishman Carbogen Amcis Ltd.",
        "sector": "Pharmaceuticals & Drugs"
    },
    {
        "symbol": "PEL",
        "name": "Piramal Enterprises Ltd.",
        "sector": "Finance - NBFC"
    },
    {
        "symbol": "DMART",
        "name": "Avenue Supermarts Ltd.",
        "sector": "Retailing"
    },
    {
        "symbol": "AARTIIND",
        "name": "Aarti Industries Ltd.",
        "sector": "Chemicals"
    },
    {
        "symbol": "BALKRISIND",
        "name": "Balkrishna Industries Ltd.",
        "sector": "Tyres & Allied"
    },
    {
        "symbol": "SONACOMS",
        "name": "Sona BLW Precision Forgings Ltd.",
        "sector": "Auto Ancillary"
    },
    {
        "symbol": "KANSAINER",
        "name": "Kansai Nerolac Paints Ltd.",
        "sector": "Paints"
    },
    {
        "symbol": "MAITHANALL",
        "name": "Maithan Alloys Ltd.",
        "sector": "Ferro & Silica Manganese"
    },
    {
        "symbol": "RENUKA",
        "name": "Shree Renuka Sugars Ltd.",
        "sector": "Sugar"
    },
    {
        "symbol": "LAURUSLABS",
        "name": "Laurus Labs Ltd.",
        "sector": "Pharmaceuticals & Drugs"
    },
    {
        "symbol": "CUMMINSIND",
        "name": "Cummins India Ltd.",
        "sector": "Diesel Engines"
    },
    {
        "symbol": "AMIORG",
        "name": "AMI Organics Ltd.",
        "sector": "Pharmaceuticals & Drugs"
    },
    {
        "symbol": "ZYDUSLIFE",
        "name": "Zydus Lifesciences Ltd.",
        "sector": "Pharmaceuticals & Drugs"
    },
    {
        "symbol": "BAJAJCON",
        "name": "Bajaj Consumer Care Ltd.",
        "sector": "Household & Personal Products"
    },
    {
        "symbol": "SUNPHARMA",
        "name": "Sun Pharmaceutical Industries Ltd.",
        "sector": "Pharmaceuticals & Drugs"
    },
    {
        "symbol": "AUROPHARMA",
        "name": "Aurobindo Pharma Ltd.",
        "sector": "Pharmaceuticals & Drugs"
    },
    {
        "symbol": "FIEMIND",
        "name": "Fiem Industries Ltd.",
        "sector": "Auto Ancillary"
    },
    {
        "symbol": "RAILTEL",
        "name": "Railtel Corporation Of India Ltd.",
        "sector": "Telecommunication - Service  Provider"
    },
    {
        "symbol": "CRISIL",
        "name": "CRISIL Ltd.",
        "sector": "Ratings"
    },
    {
        "symbol": "SANSERA",
        "name": "Sansera Engineering Ltd.",
        "sector": "Auto Ancillary"
    },
    {
        "symbol": "BALMLAWRIE",
        "name": "Balmer Lawrie & Company Ltd.",
        "sector": "Diversified"
    },
    {
        "symbol": "SHRIRAMFIN",
        "name": "Shriram Finance Ltd.",
        "sector": "Finance - NBFC"
    },
    {
        "symbol": "PRICOLLTD",
        "name": "Pricol Ltd.",
        "sector": "Auto Ancillary"
    },
    {
        "symbol": "IIFLCAPS",
        "name": "IIFL Capital Services Ltd.",
        "sector": "Finance - Investment"
    },
    {
        "symbol": "ENTERO",
        "name": "Entero Healthcare Solutions Ltd.",
        "sector": "Trading"
    },
    {
        "symbol": "VSTIND",
        "name": "VST Industries Ltd.",
        "sector": "Cigarettes/Tobacco"
    },
    {
        "symbol": "INOXINDIA",
        "name": "Inox India Ltd.",
        "sector": "Engineering - Industrial Equipments"
    },
    {
        "symbol": "VOLTAMP",
        "name": "Voltamp Transformers Ltd.",
        "sector": "Electric Equipment"
    },
    {
        "symbol": "PTC",
        "name": "PTC India Ltd.",
        "sector": "Power Generation/Distribution"
    },
    {
        "symbol": "EICHERMOT",
        "name": "Eicher Motors Ltd.",
        "sector": "Automobile Two & Three Wheelers"
    },
    {
        "symbol": "SARDAEN",
        "name": "Sarda Energy & Minerals Ltd.",
        "sector": "Steel & Iron Products"
    },
    {
        "symbol": "BALRAMCHIN",
        "name": "Balrampur Chini Mills Ltd.",
        "sector": "Sugar"
    },
    {
        "symbol": "BIRLACORPN",
        "name": "Birla Corporation Ltd.",
        "sector": "Diversified"
    },
    {
        "symbol": "SANGHIIND",
        "name": "Sanghi Industries Ltd.",
        "sector": "Cement & Construction Materials"
    },
    {
        "symbol": "HEROMOTOCO",
        "name": "Hero MotoCorp Ltd.",
        "sector": "Automobile Two & Three Wheelers"
    },
    {
        "symbol": "WESTLIFE",
        "name": "Westlife Foodworld Ltd",
        "sector": "Restaurants"
    },
    {
        "symbol": "AXISBANK",
        "name": "Axis Bank Ltd.",
        "sector": "Bank - Private"
    },
    {
        "symbol": "NMDC",
        "name": "NMDC Ltd.",
        "sector": "Mining & Minerals"
    },
    {
        "symbol": "TRIVENI",
        "name": "Triveni Engineering & Industries Ltd.",
        "sector": "Sugar"
    },
    {
        "symbol": "ODIGMA",
        "name": "Page not found",
        "sector": "Page not found"
    },
    {
        "symbol": "IDBI",
        "name": "IDBI Bank Ltd.",
        "sector": "Bank - Private"
    },
    {
        "symbol": "OLECTRA",
        "name": "Olectra Greentech Ltd.",
        "sector": "Automobiles-Trucks/Lcv"
    },
    {
        "symbol": "BIocon",
        "name": "Biocon Ltd.",
        "sector": "Pharmaceuticals & Drugs"
    },
    {
        "symbol": "TIMETECHNO",
        "name": "Time Technoplast Ltd.",
        "sector": "Plastic Products"
    },
    {
        "symbol": "IFBIND",
        "name": "IFB Industries Ltd.",
        "sector": "Consumer Durables - Domestic Appliances"
    },
    {
        "symbol": "BBL",
        "name": "Bharat Bijlee Ltd.",
        "sector": "Electric Equipment"
    },
    {
        "symbol": "COROMANDEL",
        "name": "Coromandel International Ltd.",
        "sector": "Fertilizers"
    },
    {
        "symbol": "ACI",
        "name": "Archean Chemical Industries Ltd.",
        "sector": "Chemicals"
    },
    {
        "symbol": "MSUMI",
        "name": "Motherson Sumi Wiring India Ltd.",
        "sector": "Steel & Iron Products"
    },
    {
        "symbol": "BEML",
        "name": "BEML Ltd.",
        "sector": "Construction Vehicles"
    },
    {
        "symbol": "PIDILITIND",
        "name": "Pidilite Industries Ltd.",
        "sector": "Chemicals"
    },
    {
        "symbol": "ORIENTCEM",
        "name": "Orient Cement Ltd.",
        "sector": "Cement & Construction Materials"
    },
    {
        "symbol": "SONATSOFTW",
        "name": "Sonata Software Ltd.",
        "sector": "IT - Software"
    },
    {
        "symbol": "KARURVYSYA",
        "name": "Karur Vysya Bank Ltd.",
        "sector": "Bank - Private"
    },
    {
        "symbol": "MUTHOOTMF",
        "name": "Muthoot Microfin Ltd.",
        "sector": "Finance - NBFC"
    },
    {
        "symbol": "LTTS",
        "name": "L&T Technology Services Ltd.",
        "sector": "IT - Software"
    },
    {
        "symbol": "EMAMILTD",
        "name": "Emami Ltd.",
        "sector": "Household & Personal Products"
    },
    {
        "symbol": "ABCAPITAL",
        "name": "Aditya Birla Capital Ltd.",
        "sector": "Finance - NBFC"
    },
    {
        "symbol": "VAIBHAVGBL",
        "name": "Vaibhav Global Ltd.",
        "sector": "Retailing"
    },
    {
        "symbol": "EMUDHRA",
        "name": "eMudhra Ltd.",
        "sector": "BPO/ITeS"
    },
    {
        "symbol": "KAYNES",
        "name": "Kaynes Technology India Ltd.",
        "sector": "Electronics - Components"
    },
    {
        "symbol": "SCI",
        "name": "Shipping Corporation Of India Ltd.",
        "sector": "Shipping"
    },
    {
        "symbol": "PARAS",
        "name": "Paras Defence And Space Technologies Ltd.",
        "sector": "Defence"
    },
    {
        "symbol": "METROPOLIS",
        "name": "Metropolis Healthcare Ltd.",
        "sector": "Hospital & Healthcare Services"
    },
    {
        "symbol": "COLPAL",
        "name": "Colgate-Palmolive (India) Ltd.",
        "sector": "Household & Personal Products"
    },
    {
        "symbol": "GRANULES",
        "name": "Granules India Ltd.",
        "sector": "Pharmaceuticals & Drugs"
    },
    {
        "symbol": "ESCORTS",
        "name": "Escorts Kubota Ltd.",
        "sector": "Automobiles-Tractors"
    },
    {
        "symbol": "EPIGRAL",
        "name": "Epigral Ltd.",
        "sector": "Chemicals"
    },
    {
        "symbol": "DELHIVERY",
        "name": "Delhivery Ltd.",
        "sector": "Courier  Services"
    },
    {
        "symbol": "DABUR",
        "name": "Dabur India Ltd.",
        "sector": "Household & Personal Products"
    },
    {
        "symbol": "TEXRAIL",
        "name": "Texmaco Rail & Engineering Ltd.",
        "sector": "Railways Wagons"
    },
    {
        "symbol": "RAMCOCEM",
        "name": "The Ramco Cements Ltd.",
        "sector": "Cement & Construction Materials"
    },
    {
        "symbol": "RATEGAIN",
        "name": "RateGain Travel Technologies Ltd.",
        "sector": "IT - Software"
    },
    {
        "symbol": "BALAMINES",
        "name": "Balaji Amines Ltd.",
        "sector": "Chemicals"
    },
    {
        "symbol": "AARTIDRUGS",
        "name": "Aarti Drugs Ltd.",
        "sector": "Pharmaceuticals & Drugs"
    },
    {
        "symbol": "NUVAMA",
        "name": "Nuvama Wealth Management Ltd.",
        "sector": "Finance - Others"
    },
    {
        "symbol": "THERMAX",
        "name": "Thermax Ltd.",
        "sector": "Engineering - Industrial Equipments"
    },
    {
        "symbol": "CGCL",
        "name": "Capri Global Capital Ltd.",
        "sector": "Finance - Investment"
    },
    {
        "symbol": "NAUKRI",
        "name": "Info Edge (India) Ltd.",
        "sector": "BPO/ITeS"
    },
    {
        "symbol": "ADANIPORTS",
        "name": "Adani Ports and Special Economic Zone Ltd.",
        "sector": "Port"
    },
    {
        "symbol": "LICHSGFIN",
        "name": "LIC Housing Finance Ltd.",
        "sector": "Finance - Housing"
    },
    {
        "symbol": "GUJGASLTD",
        "name": "Gujarat Gas Ltd.",
        "sector": "Gas Transmission/Marketing"
    },
    {
        "symbol": "ITI",
        "name": "ITI Ltd.",
        "sector": "Telecommunication - Equipment"
    },
    {
        "symbol": "MRF",
        "name": "MRF Ltd.",
        "sector": "Tyres & Allied"
    },
    {
        "symbol": "CYIENTDLM",
        "name": "Cyient DLM Ltd.",
        "sector": "Electric Equipment"
    },
    {
        "symbol": "TATAELXSI",
        "name": "Tata Elxsi Ltd.",
        "sector": "IT - Software"
    },
    {
        "symbol": "GODIGIT",
        "name": "Go Digit General Insurance Ltd.",
        "sector": "Insurance"
    },
    {
        "symbol": "DBREALTY",
        "name": "Valor Estate Ltd.",
        "sector": "Construction - Real Estate"
    },
    {
        "symbol": "HEIDELBERG",
        "name": "Heidelberg Cement India Ltd.",
        "sector": "Cement & Construction Materials"
    },
    {
        "symbol": "TATACHEM",
        "name": "Tata Chemicals Ltd.",
        "sector": "Chemicals"
    },
    {
        "symbol": "GRINFRA",
        "name": "GR Infraprojects Ltd.",
        "sector": "Engineering - Construction"
    },
    {
        "symbol": "SUPRAJIT",
        "name": "Suprajit Engineering Ltd.",
        "sector": "Auto Ancillary"
    },
    {
        "symbol": "MTARTECH",
        "name": "MTAR Technologies Ltd.",
        "sector": "Engineering"
    },
    {
        "symbol": "SUPRIYA",
        "name": "Supriya Lifescience Ltd.",
        "sector": "Pharmaceuticals & Drugs"
    },
    {
        "symbol": "ASTERDM",
        "name": "Aster DM Healthcare Ltd.",
        "sector": "Hospital & Healthcare Services"
    },
    {
        "symbol": "RAININDIA",
        "name": "Page not found",
        "sector": "Page not found"
    },
    {
        "symbol": "ASTRAZEN",
        "name": "Astrazeneca Pharma India Ltd.",
        "sector": "Pharmaceuticals & Drugs"
    },
    {
        "symbol": "ICICIGI",
        "name": "ICICI Lombard General Insurance Company Ltd.",
        "sector": "Insurance"
    },
    {
        "symbol": "CUB",
        "name": "City Union Bank Ltd.",
        "sector": "Bank - Private"
    },
    {
        "symbol": "SUBROS",
        "name": "Subros Ltd.",
        "sector": "Auto Ancillary"
    },
    {
        "symbol": "KAJARIACER",
        "name": "Kajaria Ceramics Ltd.",
        "sector": "Ceramics/Marble/Granite/Sanitaryware"
    },
    {
        "symbol": "ONGC",
        "name": "Oil & Natural Gas Corporation Ltd.",
        "sector": "Oil Exploration"
    },
    {
        "symbol": "LEMONTREE",
        "name": "Lemon Tree Hotels Ltd.",
        "sector": "Hotel, Resort & Restaurants"
    },
    {
        "symbol": "FINEORG",
        "name": "Fine Organic Industries Ltd.",
        "sector": "Chemicals"
    },
    {
        "symbol": "DODLA",
        "name": "Dodla Dairy Ltd",
        "sector": "Consumer Food"
    },
    {
        "symbol": "COCHINSHIP",
        "name": "Cochin Shipyard Ltd.",
        "sector": "Ship Building"
    },
    {
        "symbol": "DEN",
        "name": "Den Networks Ltd.",
        "sector": "TV Broadcasting & Software Production"
    },
    {
        "symbol": "SULA",
        "name": "Sula Vineyards Ltd.",
        "sector": "Breweries & Distilleries"
    },
    {
        "symbol": "INDIGO",
        "name": "Interglobe Aviation Ltd.",
        "sector": "Airlines"
    },
    {
        "symbol": "ACE",
        "name": "Action Construction Equipment Ltd.",
        "sector": "Construction Vehicles"
    },
    {
        "symbol": "CHOICEIN",
        "name": "Choice International Ltd.",
        "sector": "Finance - Stock Broking"
    },
    {
        "symbol": "JTLIND",
        "name": "JTL Industries Ltd",
        "sector": "Steel & Iron Products"
    },
    {
        "symbol": "SANGHVIMOV",
        "name": "Sanghvi Movers Ltd.",
        "sector": "Construction Vehicles"
    },
    {
        "symbol": "INDIGOPNTS",
        "name": "Indigo Paints Ltd.",
        "sector": "Paints"
    },
    {
        "symbol": "SHYAMMETL",
        "name": "Shyam Metalics And Energy Ltd.",
        "sector": "Steel & Iron Products"
    },
    {
        "symbol": "NAVINFLUOR",
        "name": "Navin Fluorine International Ltd.",
        "sector": "Chemicals"
    },
    {
        "symbol": "SYNGENE",
        "name": "Syngene International Ltd.",
        "sector": "Business Support"
    },
    {
        "symbol": "JTEKTINDIA",
        "name": "JTEKT India Ltd.",
        "sector": "Auto Ancillary"
    },
    {
        "symbol": "PCBL",
        "name": "PCBL Chemical Ltd.",
        "sector": "Carbon Black"
    },
    {
        "symbol": "PURVA",
        "name": "Puravankara Ltd.",
        "sector": "Construction - Real Estate"
    },
    {
        "symbol": "SANOFI",
        "name": "Sanofi India Ltd.",
        "sector": "Pharmaceuticals & Drugs"
    },
    {
        "symbol": "GAIL",
        "name": "GAIL (India) Ltd.",
        "sector": "Industrial  Gases & Fuels"
    },
    {
        "symbol": "TEGA",
        "name": "Tega Industries Ltd.",
        "sector": "Engineering - Industrial Equipments"
    },
    {
        "symbol": "RITES",
        "name": "Rites Ltd.",
        "sector": "Engineering"
    },
    {
        "symbol": "SOLARINDS",
        "name": "Solar Industries India Ltd.",
        "sector": "Chemicals"
    },
    {
        "symbol": "CERA",
        "name": "Cera Sanitaryware Ltd.",
        "sector": "Ceramics/Marble/Granite/Sanitaryware"
    },
    {
        "symbol": "ALOKINDS",
        "name": "Alok Industries Ltd.",
        "sector": "Textile"
    },
    {
        "symbol": "AUBANK",
        "name": "AU Small Finance Bank Ltd.",
        "sector": "Bank - Private"
    },
    {
        "symbol": "ANURAS",
        "name": "Anupam Rasayan India Ltd.",
        "sector": "Chemicals"
    },
    {
        "symbol": "VOLTAS",
        "name": "Voltas Ltd.",
        "sector": "Air Conditioners"
    },
    {
        "symbol": "INDIAGLYCO",
        "name": "India Glycols Ltd.",
        "sector": "Chemicals"
    },
    {
        "symbol": "MPHASIS",
        "name": "Mphasis Ltd.",
        "sector": "IT - Software"
    },
    {
        "symbol": "BOMDYEING",
        "name": "Bombay Dyeing And Manufacturing Company Ltd.",
        "sector": "Textile"
    },
    {
        "symbol": "NESCO",
        "name": "Nesco Ltd.",
        "sector": "Engineering - Industrial Equipments"
    },
    {
        "symbol": "SPARC",
        "name": "Sun Pharma Advanced Research Company Ltd.",
        "sector": "Business Support"
    },
    {
        "symbol": "NFL",
        "name": "National Fertilizers Ltd.",
        "sector": "Fertilizers"
    },
    {
        "symbol": "TCS",
        "name": "Tata Consultancy Services Ltd.",
        "sector": "IT - Software"
    },
    {
        "symbol": "MOTILALOFS",
        "name": "Motilal Oswal Financial Services Ltd.",
        "sector": "Finance - Stock Broking"
    },
    {
        "symbol": "TITAN",
        "name": "Titan Company Ltd.",
        "sector": "Diamond  &  Jewellery"
    },
    {
        "symbol": "QUESS",
        "name": "Quess Corp Ltd.",
        "sector": "BPO/ITeS"
    },
    {
        "symbol": "PATELENG",
        "name": "Patel Engineering Ltd.",
        "sector": "Engineering - Construction"
    },
    {
        "symbol": "ALLCARGO",
        "name": "Allcargo Logistics Ltd.",
        "sector": "Logistics"
    },
    {
        "symbol": "PNB",
        "name": "Punjab National Bank",
        "sector": "Bank - Public"
    },
    {
        "symbol": "GILLETTE",
        "name": "Gillette India Ltd.",
        "sector": "Household & Personal Products"
    },
    {
        "symbol": "MAHABANK",
        "name": "Bank Of Maharashtra",
        "sector": "Bank - Public"
    },
    {
        "symbol": "FUSION",
        "name": "Fusion Finance Ltd.",
        "sector": "Finance - NBFC"
    },
    {
        "symbol": "LTIM",
        "name": "LTIMindtree Ltd.",
        "sector": "IT - Software"
    },
    {
        "symbol": "BATAINDIA",
        "name": "Bata India Ltd.",
        "sector": "Footwear"
    },
    {
        "symbol": "PPLPHARMA",
        "name": "Piramal Pharma Ltd.",
        "sector": "Pharmaceuticals & Drugs"
    },
    {
        "symbol": "TORNTPOWER",
        "name": "Torrent Power Ltd.",
        "sector": "Power Generation/Distribution"
    },
    {
        "symbol": "CARBORUNIV",
        "name": "Carborundum Universal Ltd.",
        "sector": "Abrasives"
    },
    {
        "symbol": "VGUARD",
        "name": "V-Guard Industries Ltd.",
        "sector": "Electric Equipment"
    },
    {
        "symbol": "UCOBANK",
        "name": "UCO Bank",
        "sector": "Bank - Public"
    },
    {
        "symbol": "DEEPAKNTR",
        "name": "Deepak Nitrite Ltd.",
        "sector": "Chemicals"
    },
    {
        "symbol": "NATIONALUM",
        "name": "National Aluminium Company Ltd.",
        "sector": "Aluminium & Aluminium Products"
    },
    {
        "symbol": "TCIEXP",
        "name": "TCI Express Ltd.",
        "sector": "Logistics"
    },
    {
        "symbol": "PARKHOTELS",
        "name": "Apeejay Surrendra Park Hotels Ltd.",
        "sector": "Hotel, Resort & Restaurants"
    },
    {
        "symbol": "JWL",
        "name": "Jupiter Wagons Ltd.",
        "sector": "Railways Wagons"
    },
    {
        "symbol": "BANDHANBNK",
        "name": "Bandhan Bank Ltd.",
        "sector": "Bank - Private"
    },
    {
        "symbol": "SWANENERGY",
        "name": "Swan Energy Ltd.",
        "sector": "Textile"
    },
    {
        "symbol": "KPIL",
        "name": "Kalpataru Projects International Ltd.",
        "sector": "Engineering - Construction"
    },
    {
        "symbol": "PGHL",
        "name": "Procter & Gamble Health Ltd.",
        "sector": "Pharmaceuticals & Drugs"
    },
    {
        "symbol": "BBTC",
        "name": "Bombay Burmah Trading Corporation Ltd.",
        "sector": "Agriculture"
    },
    {
        "symbol": "NHPC",
        "name": "NHPC Ltd.",
        "sector": "Power Generation/Distribution"
    },
    {
        "symbol": "AIAENG",
        "name": "AIA Engineering Ltd.",
        "sector": "Castings/Forgings"
    },
    {
        "symbol": "NBCC",
        "name": "NBCC (India) Ltd.",
        "sector": "Construction - Real Estate"
    },
    {
        "symbol": "LTF",
        "name": "L&T Finance Ltd.",
        "sector": "Finance - NBFC"
    },
    {
        "symbol": "BSOFT",
        "name": "Birlasoft Ltd.",
        "sector": "IT - Software"
    },
    {
        "symbol": "REDINGTON",
        "name": "Redington Ltd.",
        "sector": "Trading"
    },
    {
        "symbol": "ASTRAL",
        "name": "Astral Ltd.",
        "sector": "Plastic Products"
    },
    {
        "symbol": "SOBHA",
        "name": "Sobha Ltd.",
        "sector": "Construction - Real Estate"
    },
    {
        "symbol": "DRREDDY",
        "name": "Dr. Reddy''s Laboratories Ltd.",
        "sector": "Pharmaceuticals & Drugs"
    },
    {
        "symbol": "JYOTHYLAB",
        "name": "Jyothy Labs Ltd.",
        "sector": "Household & Personal Products"
    },
    {
        "symbol": "ELECON",
        "name": "Elecon Engineering Company Ltd.",
        "sector": "Engineering - Industrial Equipments"
    },
    {
        "symbol": "JIOFIN",
        "name": "JIO Financial Services Ltd.",
        "sector": "Finance - NBFC"
    },
    {
        "symbol": "UNITDSPR",
        "name": "United Spirits Ltd.",
        "sector": "Breweries & Distilleries"
    },
    {
        "symbol": "KIRLPNU",
        "name": "Kirloskar Pneumatic Company Ltd.",
        "sector": "Compressors / Pumps"
    },
    {
        "symbol": "INGERRAND",
        "name": "Ingersoll-Rand (India) Ltd.",
        "sector": "Compressors / Pumps"
    },
    {
        "symbol": "GUJALKALI",
        "name": "Gujarat Alkalies And Chemicals Ltd.",
        "sector": "Chemicals"
    },
    {
        "symbol": "APOLLOHOSP",
        "name": "Apollo Hospitals Enterprise Ltd.",
        "sector": "Hospital & Healthcare Services"
    },
    {
        "symbol": "FINCABLES",
        "name": "Finolex Cables Ltd.",
        "sector": "Cable"
    },
    {
        "symbol": "ATGL",
        "name": "Adani Total Gas Ltd.",
        "sector": "Gas Transmission/Marketing"
    },
    {
        "symbol": "ASHOKA",
        "name": "Ashoka Buildcon Ltd.",
        "sector": "Engineering - Construction"
    },
    {
        "symbol": "BAJFINANCE",
        "name": "Bajaj Finance Ltd.",
        "sector": "Finance - NBFC"
    },
    {
        "symbol": "JKTYRE",
        "name": "JK Tyre & Industries Ltd.",
        "sector": "Tyres & Allied"
    },
    {
        "symbol": "GNFC",
        "name": "Gujarat Narmada Valley Fertilizers & Chemicals Ltd.",
        "sector": "Fertilizers"
    },
    {
        "symbol": "GSFC",
        "name": "Gujarat State Fertilizers & Chemicals Ltd.",
        "sector": "Fertilizers"
    },
    {
        "symbol": "ASTRAMICRO",
        "name": "Astra Microwave Products Ltd.",
        "sector": "Defence"
    },
    {
        "symbol": "IFCI",
        "name": "IFCI Ltd.",
        "sector": "Finance Term Lending"
    },
    {
        "symbol": "OPTIEMUS",
        "name": "Optiemus Infracom Ltd.",
        "sector": "Trading"
    },
    {
        "symbol": "AMBUJACEM",
        "name": "Ambuja Cements Ltd.",
        "sector": "Cement & Construction Materials"
    },
    {
        "symbol": "FDC",
        "name": "FDC Ltd.",
        "sector": "Pharmaceuticals & Drugs"
    },
    {
        "symbol": "ANGELONE",
        "name": "Angel One Ltd.",
        "sector": "Finance - Stock Broking"
    },
    {
        "symbol": "RCF",
        "name": "Rashtriya Chemicals and Fertilizers Ltd.",
        "sector": "Fertilizers"
    },
    {
        "symbol": "INDIAMART",
        "name": "Indiamart Intermesh Ltd.",
        "sector": "e-Commerce"
    },
    {
        "symbol": "MFSL",
        "name": "Max Financial Services Ltd.",
        "sector": "Finance - Others"
    },
    {
        "symbol": "TEAMLEASE",
        "name": "TeamLease Services Ltd.",
        "sector": "Professional Services"
    },
    {
        "symbol": "GMMPFAUDLR",
        "name": "GMM Pfaudler Ltd.",
        "sector": "Engineering - Industrial Equipments"
    },
    {
        "symbol": "EIHOTEL",
        "name": "EIH Ltd.",
        "sector": "Hotel, Resort & Restaurants"
    },
    {
        "symbol": "SAFARI",
        "name": "Safari Industries (India) Ltd.",
        "sector": "Household & Personal Products"
    },
    {
        "symbol": "NAZARA",
        "name": "Nazara Technologies Ltd.",
        "sector": "IT - Software"
    },
    {
        "symbol": "SFL",
        "name": "Sheela Foam Ltd.",
        "sector": "Household & Personal Products"
    },
    {
        "symbol": "BAYERCROP",
        "name": "Bayer CropScience Ltd.",
        "sector": "Pesticides & Agrochemicals"
    },
    {
        "symbol": "KESORAMIND",
        "name": "Kesoram Industries Ltd.",
        "sector": "Cement & Construction Materials"
    },
    {
        "symbol": "ITDCEM",
        "name": "ITD Cementation India Ltd.",
        "sector": "Engineering - Construction"
    },
    {
        "symbol": "FLUOROCHEM",
        "name": "Gujarat Fluorochemicals Ltd.",
        "sector": "Chemicals"
    },
    {
        "symbol": "M&MFIN",
        "name": "Page not found",
        "sector": "Page not found"
    },
    {
        "symbol": "GREENPLY",
        "name": "Greenply Industries Ltd.",
        "sector": "Wood & Wood Products"
    },
    {
        "symbol": "BANKBARODA",
        "name": "Bank Of Baroda",
        "sector": "Bank - Public"
    },
    {
        "symbol": "BLUESTARCO",
        "name": "Blue Star Ltd.",
        "sector": "Air Conditioners"
    },
    {
        "symbol": "DCMSHRIRAM",
        "name": "DCM Shriram Ltd.",
        "sector": "Diversified"
    },
    {
        "symbol": "LMW",
        "name": "LMW Ltd.",
        "sector": "Textile - Machinery"
    },
    {
        "symbol": "STLTECH",
        "name": "Sterlite Technologies Ltd.",
        "sector": "Cable"
    },
    {
        "symbol": "INFIBEAM",
        "name": "Infibeam Avenues Ltd.",
        "sector": "Fintech"
    },
    {
        "symbol": "IRCTC",
        "name": "Indian Railway Catering And Tourism Corporation Ltd.",
        "sector": "Travel Services"
    },
    {
        "symbol": "EMCURE",
        "name": "Emcure Pharmaceuticals Ltd.",
        "sector": "Pharmaceuticals & Drugs"
    },
    {
        "symbol": "BECTORFOOD",
        "name": "Mrs. Bectors Food Specialities Ltd.",
        "sector": "Consumer Food"
    },
    {
        "symbol": "CHOLAFIN",
        "name": "Cholamandalam Investment and Finance Company Ltd.",
        "sector": "Finance - NBFC"
    },
    {
        "symbol": "ABB",
        "name": "ABB India Ltd.",
        "sector": "Electric Equipment"
    },
    {
        "symbol": "RALLIS",
        "name": "Rallis India Ltd.",
        "sector": "Pesticides & Agrochemicals"
    },
    {
        "symbol": "PFIZER",
        "name": "Pfizer Ltd.",
        "sector": "Pharmaceuticals & Drugs"
    },
    {
        "symbol": "NEWGEN",
        "name": "Newgen Software Technologies Ltd.",
        "sector": "IT - Software"
    },
    {
        "symbol": "SUZLON",
        "name": "Suzlon Energy Ltd.",
        "sector": "Electric Equipment"
    },
    {
        "symbol": "PRAJIND",
        "name": "Praj Industries Ltd.",
        "sector": "Engineering - Industrial Equipments"
    },
    {
        "symbol": "IRCON",
        "name": "Ircon International Ltd.",
        "sector": "Engineering - Construction"
    },
    {
        "symbol": "OIL",
        "name": "Oil India Ltd.",
        "sector": "Oil Exploration"
    },
    {
        "symbol": "SIEMENS",
        "name": "Siemens Ltd.",
        "sector": "Electric Equipment"
    },
    {
        "symbol": "BIKAJI",
        "name": "Bikaji Foods International Ltd.",
        "sector": "Consumer Food"
    },
    {
        "symbol": "TATAPOWER",
        "name": "Tata Power Company Ltd.",
        "sector": "Power Generation/Distribution"
    },
    {
        "symbol": "JPPOWER",
        "name": "Jaiprakash Power Ventures Ltd.",
        "sector": "Power Generation/Distribution"
    },
    {
        "symbol": "POWERGRID",
        "name": "Power Grid Corporation Of India Ltd.",
        "sector": "Power Generation/Distribution"
    },
    {
        "symbol": "CSBBANK",
        "name": "CSB Bank Ltd.",
        "sector": "Bank - Private"
    },
    {
        "symbol": "TI",
        "name": "Tilaknagar Industries Ltd.",
        "sector": "Breweries & Distilleries"
    },
    {
        "symbol": "ALKEM",
        "name": "Alkem Laboratories Ltd.",
        "sector": "Pharmaceuticals & Drugs"
    },
    {
        "symbol": "MANYAVAR",
        "name": "Vedant Fashions Ltd.",
        "sector": "Textile"
    },
    {
        "symbol": "NIITMTS",
        "name": "NIIT Learning Systems Ltd.",
        "sector": "IT - Software"
    },
    {
        "symbol": "VIPIND",
        "name": "VIP Industries Ltd.",
        "sector": "Household & Personal Products"
    },
    {
        "symbol": "MAHSEAMLES",
        "name": "Maharashtra Seamless Ltd.",
        "sector": "Steel & Iron Products"
    },
    {
        "symbol": "WHIRLPOOL",
        "name": "Whirlpool Of India Ltd.",
        "sector": "Consumer Durables - Domestic Appliances"
    },
    {
        "symbol": "LUXIND",
        "name": "Lux Industries Ltd.",
        "sector": "Textile"
    },
    {
        "symbol": "DIVISLAB",
        "name": "Divi''s Laboratories Ltd.",
        "sector": "Pharmaceuticals & Drugs"
    },
    {
        "symbol": "IXIGO",
        "name": "Le Travenues Technology Ltd.",
        "sector": "Travel Services"
    },
    {
        "symbol": "NUVOCO",
        "name": "Nuvoco Vistas Corporation Ltd.",
        "sector": "Cement & Construction Materials"
    },
    {
        "symbol": "HAPPYFORGE",
        "name": "Happy Forgings Ltd.",
        "sector": "Forgings"
    },
    {
        "symbol": "SJVN",
        "name": "SJVN Ltd.",
        "sector": "Power Generation/Distribution"
    },
    {
        "symbol": "ABSLAMC",
        "name": "Aditya Birla Sun Life AMC Ltd.",
        "sector": "Finance - Asset Management"
    },
    {
        "symbol": "JAICORPLTD",
        "name": "Jai Corp Ltd.",
        "sector": "Plastic Products"
    },
    {
        "symbol": "UNIONBANK",
        "name": "Union Bank Of India",
        "sector": "Bank - Public"
    },
    {
        "symbol": "GOKEX",
        "name": "Gokaldas Exports Ltd.",
        "sector": "Textile"
    },
    {
        "symbol": "AVALON",
        "name": "Avalon Technologies Ltd.",
        "sector": "Electronics - Components"
    },
    {
        "symbol": "HCLTECH",
        "name": "HCL Technologies Ltd.",
        "sector": "IT - Software"
    },
    {
        "symbol": "SYMPHONY",
        "name": "Symphony Ltd.",
        "sector": "Consumer Durables - Domestic Appliances"
    },
    {
        "symbol": "CHALET",
        "name": "Chalet Hotels Ltd.",
        "sector": "Hotel, Resort & Restaurants"
    },
    {
        "symbol": "ACC",
        "name": "ACC Ltd.",
        "sector": "Cement & Construction Materials"
    },
    {
        "symbol": "SBFC",
        "name": "SBFC Finance Ltd.",
        "sector": "Finance - NBFC"
    },
    {
        "symbol": "GREAVESCOT",
        "name": "Greaves Cotton Ltd.",
        "sector": "Diesel Engines"
    },
    {
        "symbol": "JKCEMENT",
        "name": "JK Cement Ltd.",
        "sector": "Cement & Construction Materials"
    },
    {
        "symbol": "ROLEXRINGS",
        "name": "Rolex Rings Ltd",
        "sector": "Bearings"
    },
    {
        "symbol": "ASHOKLEY",
        "name": "Ashok Leyland Ltd.",
        "sector": "Automobiles-Trucks/Lcv"
    },
    {
        "symbol": "BHEL",
        "name": "Bharat Heavy Electricals Ltd.",
        "sector": "Engineering - Industrial Equipments"
    },
    {
        "symbol": "ALKYLAMINE",
        "name": "Alkyl Amines Chemicals Ltd.",
        "sector": "Chemicals"
    },
    {
        "symbol": "INDIANB",
        "name": "Indian Bank",
        "sector": "Bank - Public"
    },
    {
        "symbol": "IOB",
        "name": "Indian Overseas Bank",
        "sector": "Bank - Public"
    },
    {
        "symbol": "LT",
        "name": "Larsen & Toubro Ltd.",
        "sector": "Engineering - Construction"
    },
    {
        "symbol": "KFINTECH",
        "name": "KFin Technologies Ltd.",
        "sector": "Depository Services"
    },
    {
        "symbol": "RKFORGE",
        "name": "Ramkrishna Forgings Ltd.",
        "sector": "Forgings"
    },
    {
        "symbol": "DLF",
        "name": "DLF Ltd.",
        "sector": "Construction - Real Estate"
    },
    {
        "symbol": "JLHL",
        "name": "Jupiter Life Line Hospitals Ltd.",
        "sector": "Hospital & Healthcare Services"
    },
    {
        "symbol": "LUPIN",
        "name": "Lupin Ltd.",
        "sector": "Pharmaceuticals & Drugs"
    },
    {
        "symbol": "IRB",
        "name": "IRB Infrastructure Developers Ltd.",
        "sector": "Engineering - Construction"
    },
    {
        "symbol": "KNRCON",
        "name": "KNR Constructions Ltd.",
        "sector": "Engineering - Construction"
    },
    {
        "symbol": "INOXGREEN",
        "name": "Inox Green Energy Services Ltd.",
        "sector": "Engineering"
    },
    {
        "symbol": "GODREJAGRO",
        "name": "Godrej Agrovet Ltd.",
        "sector": "Animal Feed"
    },
    {
        "symbol": "M&M",
        "name": "Page not found",
        "sector": "Page not found"
    },
    {
        "symbol": "TRIDENT",
        "name": "Trident Ltd.",
        "sector": "Textile - Spinning"
    },
    {
        "symbol": "DYNAMATECH",
        "name": "Dynamatic Technologies Ltd.",
        "sector": "Compressors / Pumps"
    },
    {
        "symbol": "PNBHOUSING",
        "name": "PNB Housing Finance Ltd.",
        "sector": "Finance - Housing"
    },
    {
        "symbol": "DALBHARAT",
        "name": "Dalmia Bharat Ltd.",
        "sector": "Cement & Construction Materials"
    },
    {
        "symbol": "UBL",
        "name": "United Breweries Ltd.",
        "sector": "Breweries & Distilleries"
    },
    {
        "symbol": "AAVAS",
        "name": "Aavas Financiers Ltd.",
        "sector": "Finance - Housing"
    },
    {
        "symbol": "HEMIPROP",
        "name": "Hemisphere Properties India Ltd.",
        "sector": "Construction - Real Estate"
    },
    {
        "symbol": "APLLTD",
        "name": "Alembic Pharmaceuticals Ltd.",
        "sector": "Pharmaceuticals & Drugs"
    },
    {
        "symbol": "GLENMARK",
        "name": "Glenmark Pharmaceuticals Ltd.",
        "sector": "Pharmaceuticals & Drugs"
    },
    {
        "symbol": "SCHAEFFLER",
        "name": "Schaeffler India Ltd.",
        "sector": "Bearings"
    },
    {
        "symbol": "JSWSTEEL",
        "name": "JSW Steel Ltd.",
        "sector": "Steel & Iron Products"
    },
    {
        "symbol": "RBA",
        "name": "Restaurant Brands Asia Ltd.",
        "sector": "Restaurants"
    },
    {
        "symbol": "BAJAJ-AUTO",
        "name": "Bajaj Auto Ltd.",
        "sector": "Automobile Two & Three Wheelers"
    },
    {
        "symbol": "TITAGARH",
        "name": "Titagarh Rail Systems Ltd.",
        "sector": "Railways Wagons"
    },
    {
        "symbol": "BHARTIARTL",
        "name": "Bharti Airtel Ltd.",
        "sector": "Telecommunication - Service  Provider"
    },
    {
        "symbol": "BASF",
        "name": "BASF India Ltd.",
        "sector": "Pesticides & Agrochemicals"
    },
    {
        "symbol": "NATCOPHARM",
        "name": "Natco Pharma Ltd.",
        "sector": "Pharmaceuticals & Drugs"
    },
    {
        "symbol": "CHAMBLFERT",
        "name": "Chambal Fertilisers and Chemicals Ltd.",
        "sector": "Fertilizers"
    },
    {
        "symbol": "AVANTIFEED",
        "name": "Avanti Feeds Ltd.",
        "sector": "Consumer Food"
    },
    {
        "symbol": "YESBANK",
        "name": "Yes Bank Ltd.",
        "sector": "Bank - Private"
    },
    {
        "symbol": "MARUTI",
        "name": "Maruti Suzuki India Ltd.",
        "sector": "Automobiles - Passenger Cars"
    },
    {
        "symbol": "ICICIBANK",
        "name": "ICICI Bank Ltd.",
        "sector": "Bank - Private"
    },
    {
        "symbol": "HAVELLS",
        "name": "Havells India Ltd.",
        "sector": "Electric Equipment"
    },
    {
        "symbol": "3MINDIA",
        "name": "3M India Ltd.",
        "sector": "Diversified"
    },
    {
        "symbol": "LICI",
        "name": "Life Insurance Corporation of India",
        "sector": "Insurance"
    },
    {
        "symbol": "CANBK",
        "name": "Canara Bank",
        "sector": "Bank - Public"
    },
    {
        "symbol": "STARHEALTH",
        "name": "Star Health and Allied Insurance Company Ltd.",
        "sector": "Insurance"
    },
    {
        "symbol": "CANFINHOME",
        "name": "Can Fin Homes Ltd.",
        "sector": "Finance - Housing"
    },
    {
        "symbol": "TATACOMM",
        "name": "Tata Communications Ltd.",
        "sector": "Telecommunication - Service  Provider"
    },
    {
        "symbol": "SSWL",
        "name": "Steel Strips Wheels Ltd.",
        "sector": "Auto Ancillary"
    },
    {
        "symbol": "ITC",
        "name": "ITC Ltd.",
        "sector": "Cigarettes/Tobacco"
    },
    {
        "symbol": "CYIENT",
        "name": "Cyient Ltd.",
        "sector": "IT - Software"
    },
    {
        "symbol": "CENTRALBK",
        "name": "Central Bank Of India",
        "sector": "Bank - Public"
    },
    {
        "symbol": "HSCL",
        "name": "Himadri Speciality Chemical Ltd.",
        "sector": "Chemicals"
    },
    {
        "symbol": "SAREGAMA",
        "name": "Saregama India Ltd.",
        "sector": "Film Production, Distribution & Entertainment"
    },
    {
        "symbol": "SRF",
        "name": "SRF Ltd.",
        "sector": "Chemicals"
    },
    {
        "symbol": "ADANIENT",
        "name": "Adani Enterprises Ltd.",
        "sector": "Trading"
    },
    {
        "symbol": "NESTLEIND",
        "name": "Nestle India Ltd.",
        "sector": "Consumer Food"
    },
    {
        "symbol": "MAHLOG",
        "name": "Mahindra Logistics Ltd.",
        "sector": "Logistics"
    },
    {
        "symbol": "HCG",
        "name": "Healthcare Global Enterprises Ltd.",
        "sector": "Hospital & Healthcare Services"
    },
    {
        "symbol": "DELTACORP",
        "name": "Delta Corp Ltd.",
        "sector": "Miscellaneous"
    },
    {
        "symbol": "PETRONET",
        "name": "Petronet LNG Ltd.",
        "sector": "Industrial  Gases & Fuels"
    },
    {
        "symbol": "RVNL",
        "name": "Rail Vikas Nigam Ltd.",
        "sector": "Engineering - Construction"
    },
    {
        "symbol": "TTML",
        "name": "Tata Teleservices (Maharashtra) Ltd.",
        "sector": "Telecommunication - Service  Provider"
    },
    {
        "symbol": "BAJAJELEC",
        "name": "Bajaj Electricals Ltd.",
        "sector": "Consumer Durables - Domestic Appliances"
    },
    {
        "symbol": "ANANTRAJ",
        "name": "Anant Raj Ltd.",
        "sector": "Construction - Real Estate"
    },
    {
        "symbol": "HDFCBANK",
        "name": "HDFC Bank Ltd.",
        "sector": "Bank - Private"
    },
    {
        "symbol": "TIMKEN",
        "name": "Timken India Ltd.",
        "sector": "Bearings"
    },
    {
        "symbol": "CMSINFO",
        "name": "CMS Info Systems Ltd.",
        "sector": "BPO/ITeS"
    },
    {
        "symbol": "BOSCHLTD",
        "name": "Bosch Ltd.",
        "sector": "Auto Ancillary"
    },
    {
        "symbol": "DEVYANI",
        "name": "Devyani International Ltd.",
        "sector": "Consumer Food"
    },
    {
        "symbol": "VTL",
        "name": "Vardhman Textiles Ltd.",
        "sector": "Textile"
    },
    {
        "symbol": "SENCO",
        "name": "Senco Gold Ltd.",
        "sector": "Diamond  &  Jewellery"
    },
    {
        "symbol": "DATAPATTNS",
        "name": "Data Patterns (India) Ltd.",
        "sector": "Defence"
    },
    {
        "symbol": "NIACL",
        "name": "The New India Assurance Company Ltd.",
        "sector": "Insurance"
    },
    {
        "symbol": "AFFLE",
        "name": "Affle (India) Ltd.",
        "sector": "BPO/ITeS"
    },
    {
        "symbol": "ULTRACEMCO",
        "name": "Ultratech Cement Ltd.",
        "sector": "Cement & Construction Materials"
    },
    {
        "symbol": "PATANJALI",
        "name": "Patanjali Foods Ltd.",
        "sector": "Edible Oil"
    },
    {
        "symbol": "WIPRO",
        "name": "Wipro Ltd.",
        "sector": "IT - Software"
    },
    {
        "symbol": "J&KBANK",
        "name": "Page not found",
        "sector": "Page not found"
    },
    {
        "symbol": "JAMNAAUTO",
        "name": "Jamna Auto Industries Ltd.",
        "sector": "Auto Ancillary"
    },
    {
        "symbol": "INFY",
        "name": "Infosys Ltd.",
        "sector": "IT - Software"
    },
    {
        "symbol": "GOCOLORS",
        "name": "Go Fashion (India) Ltd.",
        "sector": "Retailing"
    },
    {
        "symbol": "POLYCAB",
        "name": "Polycab India Ltd.",
        "sector": "Cable"
    },
    {
        "symbol": "ORCHPHARMA",
        "name": "Orchid Pharma Ltd.",
        "sector": "Pharmaceuticals & Drugs"
    },
    {
        "symbol": "EVEREADY",
        "name": "Eveready Industries India Ltd.",
        "sector": "Batteries"
    },
    {
        "symbol": "BLUEDART",
        "name": "Blue Dart Express Ltd.",
        "sector": "Courier  Services"
    },
    {
        "symbol": "SBIN",
        "name": "State Bank Of India",
        "sector": "Bank - Public"
    },
    {
        "symbol": "SCHNEIDER",
        "name": "Schneider Electric Infrastructure Ltd.",
        "sector": "Electric Equipment"
    },
    {
        "symbol": "GVT&D",
        "name": "Page not found",
        "sector": "Page not found"
    },
    {
        "symbol": "FORCEMOT",
        "name": "Force Motors Ltd.",
        "sector": "Automobiles-Trucks/Lcv"
    },
    {
        "symbol": "PHOENIXLTD",
        "name": "The Phoenix Mills Ltd.",
        "sector": "Construction - Real Estate"
    },
    {
        "symbol": "FACT",
        "name": "The Fertilisers And Chemicals Travancore Ltd.",
        "sector": "Fertilizers"
    },
    {
        "symbol": "AJANTPHARM",
        "name": "Ajanta Pharma Ltd.",
        "sector": "Pharmaceuticals & Drugs"
    },
    {
        "symbol": "CARTRADE",
        "name": "CarTrade Tech Ltd.",
        "sector": "Automobiles - Dealers & Distributors"
    },
    {
        "symbol": "STAR",
        "name": "Strides Pharma Science Ltd.",
        "sector": "Pharmaceuticals & Drugs"
    },
    {
        "symbol": "SHAREINDIA",
        "name": "Share India Securities Ltd.",
        "sector": "Finance - Stock Broking"
    },
    {
        "symbol": "SBILIFE",
        "name": "SBI Life Insurance Company Ltd.",
        "sector": "Insurance"
    },
    {
        "symbol": "TIIL",
        "name": "Technocraft Industries (India) Ltd.",
        "sector": "Steel & Iron Products"
    },
    {
        "symbol": "INDGN",
        "name": "Indegene Ltd.",
        "sector": "Pharmaceuticals & Drugs"
    },
    {
        "symbol": "BLS",
        "name": "BLS International Services Ltd.",
        "sector": "Professional Services"
    },
    {
        "symbol": "POONAWALLA",
        "name": "Poonawalla Fincorp Ltd.",
        "sector": "Finance - NBFC"
    },
    {
        "symbol": "ICICIPRULI",
        "name": "ICICI Prudential Life Insurance Company Ltd.",
        "sector": "Insurance"
    },
    {
        "symbol": "GSPL",
        "name": "Gujarat State Petronet Ltd.",
        "sector": "Gas Transmission/Marketing"
    },
    {
        "symbol": "GRSE",
        "name": "Garden Reach Shipbuilders & Engineers Ltd.",
        "sector": "Ship Building"
    },
    {
        "symbol": "HNDFDS",
        "name": "Hindustan Foods Ltd.",
        "sector": "Consumer Food"
    },
    {
        "symbol": "SKFINDIA",
        "name": "SKF India Ltd.",
        "sector": "Bearings"
    },
    {
        "symbol": "ARE&M",
        "name": "Page not found",
        "sector": "Page not found"
    },
    {
        "symbol": "BDL",
        "name": "Bharat Dynamics Ltd.",
        "sector": "Defence"
    },
    {
        "symbol": "GRASIM",
        "name": "Grasim Industries Ltd.",
        "sector": "Diversified"
    },
    {
        "symbol": "MANAPPURAM",
        "name": "Manappuram Finance Ltd.",
        "sector": "Finance - NBFC"
    },
    {
        "symbol": "RAJESHEXPO",
        "name": "Rajesh Exports Ltd.",
        "sector": "Diamond  &  Jewellery"
    },
    {
        "symbol": "SWSOLAR",
        "name": "Sterling and Wilson Renewable Energy Ltd.",
        "sector": "Engineering - Construction"
    },
    {
        "symbol": "MINDACORP",
        "name": "Minda Corporation Ltd.",
        "sector": "Auto Ancillary"
    },
    {
        "symbol": "GPPL",
        "name": "Gujarat Pipavav Port Ltd.",
        "sector": "Port"
    },
    {
        "symbol": "EMIL",
        "name": "Electronics Mart India Ltd.",
        "sector": "Retailing"
    },
    {
        "symbol": "JBMA",
        "name": "JBM Auto Ltd.",
        "sector": "Auto Ancillary"
    },
    {
        "symbol": "KSCL",
        "name": "Kaveri Seed Company Ltd.",
        "sector": "Agriculture"
    },
    {
        "symbol": "CCL",
        "name": "CCL Products (India) Ltd.",
        "sector": "Tea/Coffee"
    },
    {
        "symbol": "CEATLTD",
        "name": "Ceat Ltd.",
        "sector": "Tyres & Allied"
    },
    {
        "symbol": "CHOLAHLDNG",
        "name": "Cholamandalam Financial Holdings Ltd.",
        "sector": "Finance - Investment"
    },
    {
        "symbol": "INDUSINDBK",
        "name": "IndusInd Bank Ltd.",
        "sector": "Bank - Private"
    },
    {
        "symbol": "FEDERALBNK",
        "name": "The Federal Bank Ltd.",
        "sector": "Bank - Private"
    },
    {
        "symbol": "KSB",
        "name": "KSB Ltd.",
        "sector": "Compressors / Pumps"
    },
    {
        "symbol": "CONCOR",
        "name": "Container Corporation Of India Ltd.",
        "sector": "Logistics"
    },
    {
        "symbol": "NCC",
        "name": "NCC Ltd.",
        "sector": "Engineering - Construction"
    },
    {
        "symbol": "AWL",
        "name": "Adani Wilmar Ltd.",
        "sector": "Edible Oil"
    },
    {
        "symbol": "BANKINDIA",
        "name": "Bank Of India",
        "sector": "Bank - Public"
    },
    {
        "symbol": "IONEXCHANG",
        "name": "Ion Exchange (India) Ltd.",
        "sector": "Engineering - Industrial Equipments"
    },
    {
        "symbol": "IDFCFIRSTB",
        "name": "IDFC First Bank Ltd.",
        "sector": "Bank - Private"
    },
    {
        "symbol": "HGINFRA",
        "name": "H.G. Infra Engineering Ltd.",
        "sector": "Engineering - Construction"
    },
    {
        "symbol": "TATAMOTORS",
        "name": "Tata Motors Ltd.",
        "sector": "Automobiles-Trucks/Lcv"
    },
    {
        "symbol": "TATACONSUM",
        "name": "Tata Consumer Products Ltd.",
        "sector": "Tea/Coffee"
    },
    {
        "symbol": "MANINFRA",
        "name": "Man InfraConstruction Ltd.",
        "sector": "Engineering - Construction"
    },
    {
        "symbol": "VENKEYS",
        "name": "Venky''S (India) Ltd.",
        "sector": "Agriculture"
    },
    {
        "symbol": "SAMHI",
        "name": "Samhi Hotels Ltd.",
        "sector": "Hotel, Resort & Restaurants"
    },
    {
        "symbol": "ADVENZYMES",
        "name": "Advanced Enzyme Technologies Ltd.",
        "sector": "Pharmaceuticals & Drugs"
    },
    {
        "symbol": "RRKABEL",
        "name": "RR Kabel Ltd.",
        "sector": "Cable"
    },
    {
        "symbol": "ISEC",
        "name": "ICICI Securities Ltd.",
        "sector": "Finance - Stock Broking"
    },
    {
        "symbol": "POLICYBZR",
        "name": "PB Fintech Ltd.",
        "sector": "Fintech"
    },
    {
        "symbol": "MAZDOCK",
        "name": "Mazagon Dock Shipbuilders Ltd.",
        "sector": "Ship Building"
    },
    {
        "symbol": "APTUS",
        "name": "Aptus Value Housing Finance India Ltd.",
        "sector": "Finance - Housing"
    },
    {
        "symbol": "GODREJIND",
        "name": "Godrej Industries Ltd.",
        "sector": "Chemicals"
    },
    {
        "symbol": "NEULANDLAB",
        "name": "Neuland Laboratories Ltd.",
        "sector": "Pharmaceuticals & Drugs"
    },
    {
        "symbol": "WELENT",
        "name": "Welspun Enterprises Ltd.",
        "sector": "Construction - Real Estate"
    },
    {
        "symbol": "IPCALAB",
        "name": "Ipca Laboratories Ltd.",
        "sector": "Pharmaceuticals & Drugs"
    },
    {
        "symbol": "RESPONIND",
        "name": "Responsive Industries Ltd.",
        "sector": "Plastic Products"
    },
    {
        "symbol": "ARVINDFASN",
        "name": "Arvind Fashions Ltd.",
        "sector": "Retailing"
    },
    {
        "symbol": "ADANIPOWER",
        "name": "Adani Power Ltd.",
        "sector": "Power Generation/Distribution"
    },
    {
        "symbol": "ENGINERSIN",
        "name": "Engineers India Ltd.",
        "sector": "Engineering"
    },
    {
        "symbol": "KEI",
        "name": "KEI Industries Ltd.",
        "sector": "Cable"
    },
    {
        "symbol": "TVSMOTOR",
        "name": "TVS Motor Company Ltd.",
        "sector": "Automobile Two & Three Wheelers"
    },
    {
        "symbol": "OBEROIRLTY",
        "name": "Oberoi Realty Ltd.",
        "sector": "Construction - Real Estate"
    },
    {
        "symbol": "HAL",
        "name": "Hindustan Aeronautics Ltd.",
        "sector": "Defence"
    },
    {
        "symbol": "SUNTV",
        "name": "Sun TV Network Ltd.",
        "sector": "TV Broadcasting & Software Production"
    },
    {
        "symbol": "GICRE",
        "name": "General Insurance Corporation of India",
        "sector": "Insurance"
    },
    {
        "symbol": "ELECTCAST",
        "name": "Electrosteel Castings Ltd.",
        "sector": "Castings/Forgings"
    },
    {
        "symbol": "BORORENEW",
        "name": "Borosil Renewables Ltd.",
        "sector": "Glass"
    },
    {
        "symbol": "EXIDEIND",
        "name": "Exide Industries Ltd.",
        "sector": "Batteries"
    },
    {
        "symbol": "DISHTV",
        "name": "Dish TV India Ltd.",
        "sector": "TV Broadcasting & Software Production"
    },
    {
        "symbol": "CROMPTON",
        "name": "Crompton Greaves Consumer Electricals Ltd.",
        "sector": "Consumer Durables - Domestic Appliances"
    },
    {
        "symbol": "FINPIPE",
        "name": "Finolex Industries Ltd.",
        "sector": "Plastic Products"
    },
    {
        "symbol": "TEJASNET",
        "name": "Tejas Networks Ltd.",
        "sector": "Telecommunication - Equipment"
    },
    {
        "symbol": "ELGIEQUIP",
        "name": "Elgi Equipments Ltd.",
        "sector": "Compressors / Pumps"
    },
    {
        "symbol": "NAM-INDIA",
        "name": "Nippon Life India Asset Management Ltd.",
        "sector": "Finance - Asset Management"
    },
    {
        "symbol": "METROBRAND",
        "name": "Metro Brands Ltd.",
        "sector": "Retailing"
    },
    {
        "symbol": "GLAXO",
        "name": "Glaxosmithkline Pharmaceuticals Ltd.",
        "sector": "Pharmaceuticals & Drugs"
    },
    {
        "symbol": "CONCORDBIO",
        "name": "Concord Biotech Ltd.",
        "sector": "Pharmaceuticals & Drugs"
    },
    {
        "symbol": "SHREECEM",
        "name": "Shree Cement Ltd.",
        "sector": "Cement & Construction Materials"
    },
    {
        "symbol": "PAYTM",
        "name": "One97 Communications Ltd.",
        "sector": "Fintech"
    },
    {
        "symbol": "WABAG",
        "name": "VA Tech Wabag Ltd.",
        "sector": "Environmental Services"
    },
    {
        "symbol": "PGHH",
        "name": "Procter & Gamble Hygiene and Health Care Ltd.",
        "sector": "Household & Personal Products"
    },
    {
        "symbol": "GMRAIRPORT",
        "name": "GMR Airports Ltd.",
        "sector": "Airport Management Services"
    },
    {
        "symbol": "ZEEL",
        "name": "Zee Entertainment Enterprises Ltd.",
        "sector": "TV Broadcasting & Software Production"
    },
    {
        "symbol": "ADANIGREEN",
        "name": "Adani Green Energy Ltd.",
        "sector": "Power Generation/Distribution"
    },
    {
        "symbol": "SUPREMEIND",
        "name": "Supreme Industries Ltd.",
        "sector": "Plastic Products"
    },
    {
        "symbol": "TATATECH",
        "name": "Tata Technologies Ltd.",
        "sector": "IT - Software"
    },
    {
        "symbol": "HDFCLIFE",
        "name": "HDFC Life Insurance Company Ltd.",
        "sector": "Insurance"
    },
    {
        "symbol": "ETHOSLTD",
        "name": "Ethos Ltd.",
        "sector": "Retailing"
    },
    {
        "symbol": "KOTAKBANK",
        "name": "Kotak Mahindra Bank Ltd.",
        "sector": "Bank - Private"
    },
    {
        "symbol": "ISGEC",
        "name": "ISGEC Heavy Engineering Ltd.",
        "sector": "Engineering - Construction"
    },
    {
        "symbol": "BRITANNIA",
        "name": "Britannia Industries Ltd.",
        "sector": "Consumer Food"
    },
    {
        "symbol": "ABFRL",
        "name": "Aditya Birla Fashion and Retail Ltd.",
        "sector": "Retailing"
    },
    {
        "symbol": "MANKIND",
        "name": "Mankind Pharma Ltd.",
        "sector": "Pharmaceuticals & Drugs"
    },
    {
        "symbol": "PRESTIGE",
        "name": "Prestige Estates Projects Ltd.",
        "sector": "Construction - Real Estate"
    },
    {
        "symbol": "LATENTVIEW",
        "name": "Latent View Analytics Ltd.",
        "sector": "Business Support"
    },
    {
        "symbol": "HDFCAMC",
        "name": "HDFC Asset Management Company Ltd.",
        "sector": "Finance - Asset Management"
    },
    {
        "symbol": "HAPPSTMNDS",
        "name": "Happiest Minds Technologies Ltd.",
        "sector": "IT - Software"
    },
    {
        "symbol": "ABBOTINDIA",
        "name": "Abbott India Ltd.",
        "sector": "Pharmaceuticals & Drugs"
    },
    {
        "symbol": "TVSSCS",
        "name": "TVS Supply Chain Solutions Ltd.",
        "sector": "Logistics"
    },
    {
        "symbol": "AEGISLOG",
        "name": "Aegis Logistics Ltd.",
        "sector": "Logistics"
    },
    {
        "symbol": "EMBDL",
        "name": "Embassy Developments Ltd.",
        "sector": "Construction - Real Estate"
    },
    {
        "symbol": "HFCL",
        "name": "HFCL Ltd.",
        "sector": "Telecom-Infrastructure"
    },
    {
        "symbol": "SBICARD",
        "name": "SBI Cards And Payment Services Ltd.",
        "sector": "Finance - NBFC"
    },
    {
        "symbol": "UPL",
        "name": "UPL Ltd.",
        "sector": "Pesticides & Agrochemicals"
    },
    {
        "symbol": "HCC",
        "name": "Hindustan Construction Company Ltd.",
        "sector": "Engineering - Construction"
    },
    {
        "symbol": "JMFINANCIL",
        "name": "JM Financial Ltd.",
        "sector": "Finance - Investment"
    },
    {
        "symbol": "APLAPOLLO",
        "name": "APL Apollo Tubes Ltd.",
        "sector": "Steel & Iron Products"
    },
    {
        "symbol": "DHANI",
        "name": "Dhani Services Ltd.",
        "sector": "Finance - Stock Broking"
    },
    {
        "symbol": "BEL",
        "name": "Bharat Electronics Ltd.",
        "sector": "Defence"
    },
    {
        "symbol": "BRIGADE",
        "name": "Brigade Enterprises Ltd.",
        "sector": "Construction - Real Estate"
    },
    {
        "symbol": "ZOMATO",
        "name": "Zomato Ltd.",
        "sector": "e-Commerce"
    },
    {
        "symbol": "INDHOTEL",
        "name": "The Indian Hotels Company Ltd.",
        "sector": "Hotel, Resort & Restaurants"
    },
    {
        "symbol": "PAGEIND",
        "name": "Page Industries Ltd.",
        "sector": "Textile"
    },
    {
        "symbol": "INOXWIND",
        "name": "Inox Wind Ltd.",
        "sector": "Electric Equipment"
    },
    {
        "symbol": "MAPMYINDIA",
        "name": "CE Info Systems Ltd.",
        "sector": "IT - Software"
    },
    {
        "symbol": "DHANUKA",
        "name": "Dhanuka Agritech Ltd.",
        "sector": "Pesticides & Agrochemicals"
    },
    {
        "symbol": "GODREJPROP",
        "name": "Godrej Properties Ltd.",
        "sector": "Construction - Real Estate"
    },
    {
        "symbol": "KEC",
        "name": "KEC International Ltd.",
        "sector": "Engineering - Construction"
    },
    {
        "symbol": "SHARDAMOTR",
        "name": "Sharda Motor Industries Ltd.",
        "sector": "Auto Ancillary"
    },
    {
        "symbol": "SAIL",
        "name": "Steel Authority Of India Ltd.",
        "sector": "Steel & Iron Products"
    },
    {
        "symbol": "JSFB",
        "name": "Jana Small Finance Bank Ltd.",
        "sector": "Bank - Private"
    },
    {
        "symbol": "TRENT",
        "name": "Trent Ltd.",
        "sector": "Retailing"
    },
    {
        "symbol": "MCX",
        "name": "Multi Commodity Exchange Of India Ltd.",
        "sector": "Finance - Stock Broking"
    },
    {
        "symbol": "HARSHA",
        "name": "Harsha Engineers International Ltd.",
        "sector": "Engineering - Industrial Equipments"
    },
    {
        "symbol": "BAJAJHLDNG",
        "name": "Bajaj Holdings & Investment Ltd.",
        "sector": "Finance - NBFC"
    },
    {
        "symbol": "INDIASHLTR",
        "name": "India Shelter Finance Corporation Ltd.",
        "sector": "Finance - Housing"
    },
    {
        "symbol": "BLUEJET",
        "name": "Blue Jet Healthcare Ltd.",
        "sector": "Pharmaceuticals & Drugs"
    },
    {
        "symbol": "ATUL",
        "name": "Atul Ltd.",
        "sector": "Chemicals"
    },
    {
        "symbol": "PNCINFRA",
        "name": "PNC Infratech Ltd.",
        "sector": "Engineering - Construction"
    },
    {
        "symbol": "CESC",
        "name": "CESC Ltd.",
        "sector": "Power Generation/Distribution"
    },
    {
        "symbol": "HBLENGINE",
        "name": "HBL Engineering Ltd.",
        "sector": "Batteries"
    },
    {
        "symbol": "CLEAN",
        "name": "Clean Science And Technology Ltd.",
        "sector": "Chemicals"
    },
    {
        "symbol": "SAMMAANCAP",
        "name": "Sammaan Capital Ltd.",
        "sector": "Finance - Housing"
    },
    {
        "symbol": "LODHA",
        "name": "Macrotech Developers Ltd.",
        "sector": "Construction - Real Estate"
    },
    {
        "symbol": "OFSS",
        "name": "Oracle Financial Services Software Ltd.",
        "sector": "IT - Software"
    },
    {
        "symbol": "LINDEINDIA",
        "name": "Linde India Ltd.",
        "sector": "Industrial  Gases & Fuels"
    },
    {
        "symbol": "DIXON",
        "name": "Dixon Technologies (India) Ltd.",
        "sector": "Consumer Durables - Electronics"
    },
    {
        "symbol": "ABREL",
        "name": "Aditya Birla Real Estate Ltd.",
        "sector": "Diversified"
    },
    {
        "symbol": "AETHER",
        "name": "Aether Industries Ltd.",
        "sector": "Chemicals"
    },
    {
        "symbol": "JINDWORLD",
        "name": "Jindal Worldwide Ltd.",
        "sector": "Textile"
    },
    {
        "symbol": "APARINDS",
        "name": "Apar Industries Ltd.",
        "sector": "Electric Equipment"
    },
    {
        "symbol": "HOMEFIRST",
        "name": "Home First Finance Company India Ltd.",
        "sector": "Finance - Housing"
    },
    {
        "symbol": "AARTIPHARM",
        "name": "Aarti Pharmalabs Ltd.",
        "sector": "Pharmaceuticals & Drugs"
    },
    {
        "symbol": "NH",
        "name": "Narayana Hrudayalaya Ltd.",
        "sector": "Hospital & Healthcare Services"
    },
    {
        "symbol": "BSE",
        "name": "BSE Ltd.",
        "sector": "Finance - Others"
    },
    {
        "symbol": "JUBLFOOD",
        "name": "Jubilant FoodWorks Ltd.",
        "sector": "Consumer Food"
    },
    {
        "symbol": "HINDOILEXP",
        "name": "Hindustan Oil Exploration Company Ltd.",
        "sector": "Oil Exploration"
    },
    {
        "symbol": "TIINDIA",
        "name": "Tube Investments of India Ltd.",
        "sector": "Cycles"
    },
    {
        "symbol": "IDEA",
        "name": "Vodafone Idea Ltd.",
        "sector": "Telecommunication - Service  Provider"
    },
    {
        "symbol": "INDIACEM",
        "name": "The India Cements Ltd.",
        "sector": "Cement & Construction Materials"
    },
    {
        "symbol": "PERSISTENT",
        "name": "Persistent Systems Ltd.",
        "sector": "IT - Software"
    },
    {
        "symbol": "MAXHEALTH",
        "name": "Max Healthcare Institute Ltd.",
        "sector": "Hospital & Healthcare Services"
    },
    {
        "symbol": "FSL",
        "name": "Firstsource Solutions Ltd.",
        "sector": "BPO/ITeS"
    },
    {
        "symbol": "360ONE",
        "name": "360 One Wam Ltd.",
        "sector": "Finance - Others"
    },
    {
        "symbol": "SUVENPHAR",
        "name": "Suven Pharmaceuticals Ltd.",
        "sector": "Pharmaceuticals & Drugs"
    },
    {
        "symbol": "RAINBOW",
        "name": "Rainbow Children''s Medicare Ltd.",
        "sector": "Hospital & Healthcare Services"
    },
    {
        "symbol": "FIVESTAR",
        "name": "Five-Star Business Finance Ltd.",
        "sector": "Finance - NBFC"
    },
    {
        "symbol": "SIGNATURE",
        "name": "Signatureglobal (India) Ltd.",
        "sector": "Construction - Real Estate"
    },
    {
        "symbol": "JSWENERGY",
        "name": "JSW Energy Ltd.",
        "sector": "Power Generation/Distribution"
    },
    {
        "symbol": "INDUSTOWER",
        "name": "Indus Towers Ltd.",
        "sector": "Telecommunication - Service  Provider"
    },
    {
        "symbol": "DBL",
        "name": "Dilip Buildcon Ltd.",
        "sector": "Construction - Real Estate"
    },
    {
        "symbol": "BHARTIHEXA",
        "name": "Bharti Hexacom Ltd.",
        "sector": "Telecommunication - Service  Provider"
    },
    {
        "symbol": "SUNDARMFIN",
        "name": "Sundaram Finance Ltd.",
        "sector": "Finance - NBFC"
    },
    {
        "symbol": "TECHM",
        "name": "Tech Mahindra Ltd.",
        "sector": "IT - Software"
    },
    {
        "symbol": "ANANDRATHI",
        "name": "Anand Rathi Wealth Ltd.",
        "sector": "Finance - Others"
    },
    {
        "symbol": "CELLO",
        "name": "Cello World Ltd.",
        "sector": "Household & Personal Products"
    },
    {
        "symbol": "PARADEEP",
        "name": "Paradeep Phosphates Ltd.",
        "sector": "Fertilizers"
    },
    {
        "symbol": "FORTIS",
        "name": "Fortis Healthcare Ltd.",
        "sector": "Hospital & Healthcare Services"
    },
    {
        "symbol": "COFORGE",
        "name": "Coforge Ltd.",
        "sector": "IT - Software"
    },
    {
        "symbol": "MEDPLUS",
        "name": "Medplus Health Services Ltd.",
        "sector": "Pharmaceuticals & Drugs"
    },
    {
        "symbol": "CIGNITITEC",
        "name": "Cigniti Technologies Ltd.",
        "sector": "IT - Software"
    },
    {
        "symbol": "RELIGARE",
        "name": "Religare Enterprises Ltd.",
        "sector": "Finance - Investment"
    },
    {
        "symbol": "JBCHEPHARM",
        "name": "JB Chemicals & Pharmaceuticals Ltd.",
        "sector": "Pharmaceuticals & Drugs"
    },
    {
        "symbol": "CRAFTSMAN",
        "name": "Craftsman Automation Ltd.",
        "sector": "Auto Ancillary"
    },
    {
        "symbol": "DREAMFOLKS",
        "name": "Dreamfolks Services Ltd.",
        "sector": "Airport Management Services"
    },
    {
        "symbol": "AZAD",
        "name": "Azad Engineering Ltd.",
        "sector": "Engineering - Industrial Equipments"
    },
    {
        "symbol": "KALYANKJIL",
        "name": "Kalyan Jewellers India Ltd.",
        "sector": "Diamond  &  Jewellery"
    }
]

export default availableStocks;
