export interface IconfigService {
  get(key: string): string
}

export interface ScrapperInterface {
  navigate(url: string): Promise<void>
  exists(selector: string): Promise<boolean>
  restart(): Promise<void>
}

export interface CloudinaryUploadResponse {
    asset_id: string;
    public_id: string;
    version: number;
    version_id: string;
    signature: string;
    width: number;
    height: number;
    format: string;
    resource_type: string;
    created_at: string; // ISO 8601 date string
    tags: string[];
    bytes: number;
    type: string;
    etag: string;
    placeholder: boolean;
    url: string;
    secure_url: string;
    folder: string;
    original_filename: string;
    api_key: string;
}

// Pivot Interface
interface Pivot {
  PlantID: number;
  NameID: number;
}

// Pest Interface
interface Pest {
  ID: number;
  Name: string;
  Treatment: string;
  pivot: Pivot;
  pest_pictures: any[]; // Assuming array of objects or any other data type
}

// Interest Period Interface
interface InterestPeriod {
  ID: number;
  Name: string;
  pivot: Pivot;
}

// Pruning Period Interface
interface PruningPeriod {
  ID: number;
  Name: string;
  pivot: Pivot;
}

// Planting Period Interface
interface PlantingPeriod {
  ID: number;
  Name: string;
  pivot: Pivot;
}

// Work Involved Interface
interface WorkInvolved {
  ID: number;
  Name: string;
}

// Attribute Interface
interface Attribute {
  ID: number;
  Name: string;
  pivot: Pivot;
}

// Soil Type Interface
interface SoilType {
  ID: number;
  Name: string;
  pivot: Pivot;
}

// After Care Interface
interface AfterCare {
  ID: number;
  Name: string;
}

// Primary Color Interface
interface PrimaryColor {
  ID: number;
  Name: string;
  FlowerSID?: number;
  LeafSID?: number;
}

// Fragrance Interface
interface Fragrance {
  ID: number;
  Name: string;
}

// Growth Rate Interface
interface GrowthRate {
  ID: number;
  Name: string;
}

// Leaf Type Interface
interface LeafType {
  ID: number;
  Name: string;
}

// Moisture Level Interface
interface MoistureLevel {
  ID: number;
  Name: string;
}

// Preferred pH Interface
interface PreferredPH {
  ID: number;
  Name: string;
}

// Hardiness Interface
interface Hardiness {
  ID: number;
  Name: string;
}

// Interest Element Interface
interface InterestElement {
  ID: number;
  Name: string;
  pivot: Pivot;
}

// Pruning Advice Interface
interface PruningAdvice {
  ID: number;
  PruningID: number;
  Stage: number;
  PhotoName: string;
  Desc: string;
}

// Propagation Interface
interface Propagation {
  ID: number;
  Name: string;
  pivot: Pivot;
}

// Main Plant Interface
interface Plant {
  PlantID: number;
  PlantTypeID: number,
  Genus: string;
  CommonName: string;
  LatinName: string;
  Variety: string;
  FamilyName: string;
  Explanation: string;
  Description: string;
  CareID: number,
  SpecificCare: string;
  PlantingID:number
  Planting: string;
  FeedingID:number
  Feeding?: string;
  FlowerColour1: number;
  FlowerSID: number;
  FlowerColour2: number;
  FoliageColour1: number;
  LeafSID: number;
  FoliageColour2: number;
  HeightID: number;
  GrownHeight: string;
  SpreadID: number;
  GrownSpread: string;
  HardinessID: number;
  HardinessZoneID: number | null;
  LifeCycleID: number;
  pHID: number;
  MoistureID: number;
  AspectID: number;
  Propagation: string;
  PruningID: number;
  Pruning?: string;
  FragranceID: number;
  GerminationID: number | null;
  LeafID: number;
  WorkID: number;
  GrowthRateID: number;
  SmallGarden: number;
  CountryID: number;
  AfterCareID: number;
  PestsID: number;
  Treatment?: string;
  ResistanceID: number;
  NeedsStaking: number;
  RHS: string;
  VideoID: number | null;
  CommunityFlag: number;
  Completed: string;
  SavedPlant: string;
  TestPlant: string;
  LivePlant: string;
  Author: string | null;
  ApprovedBy: string;
  Status: number;
  updated_at: number;
  created_at: number;
  deleted_at: number;
  AuthorID: string;
  pests: Pest[];
  Disease:Disease[];
  interest_period: InterestPeriod[];
  pruning_period: PruningPeriod[];
  planting_period: PlantingPeriod[];
  work_involved: WorkInvolved;
  attributes: Attribute[];
  soil_types: SoilType[];
  after_care: AfterCare;
  primary_flower_color: PrimaryColor;
  primary_foliage_color: PrimaryColor;
  fragrance: Fragrance;
  growth_rate: GrowthRate;
  leaf_type: LeafType;
  moisture_level: MoistureLevel;
  prefered_ph: PreferredPH;
  hardiness: Hardiness;
  hardiness_zone: Hardiness | null;
  interest_elements: InterestElement[];
  pruning_advice: PruningAdvice[];
  propagation: Propagation[];
  photos:Array<string>;
}
// Disease Interface
interface Disease {
  ID: number;
  Name: string;
  Cure: string;
  pivot: Pivot;
  disease_pictures: any[]; // Assuming array of objects or any other data type
}