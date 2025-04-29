"use client";

import { useState, useEffect, useRef } from "react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Search,
  Image,
  Video,
  Music,
  File,
  Grid,
  List,
  Download,
  Heart,
  Share2,
  Filter,
  X,
  ChevronLeft,
  ChevronRight,
  Maximize2,
  Info,
  Bookmark,
  MoreHorizontal,
  Settings,
  Calendar,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Slider } from "@/components/ui/slider";
import { Skeleton } from "@/components/ui/skeleton";

import { imageCategories } from "@/assets/data/image.js";

// Function to format numbers with K for thousands
const formatNumber = (num) => {
  return num > 999 ? (num / 1000).toFixed(1) + "k" : num;
};

export default function MediaCenter() {
  const [activeTab, setActiveTab] = useState("nature");
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredImages, setFilteredImages] = useState([]);
  const [viewMode, setViewMode] = useState("grid");
  const [sortBy, setSortBy] = useState("date");
  const [activeTags, setActiveTags] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [currentImage, setCurrentImage] = useState(null);
  const [imageDialogOpen, setImageDialogOpen] = useState(false);
  const [filterDialogOpen, setFilterDialogOpen] = useState(false);
  const [isHovered, setIsHovered] = useState(null);
  const [imageQuality, setImageQuality] = useState(80);
  const [favorites, setFavorites] = useState([]);

  const imageContainerRef = useRef(null);

  // Handle URL parameters on component mount
  useEffect(() => {
    const queryParams = new URLSearchParams(window.location.search);
    const tabParam = queryParams.get("tab");
    const searchParam = queryParams.get("search");
    const tagParam = queryParams.get("tags");
    const viewParam = queryParams.get("view");
    const sortParam = queryParams.get("sort");

    if (tabParam && Object.keys(imageCategories).includes(tabParam)) {
      setActiveTab(tabParam);
    }

    if (searchParam) {
      setSearchQuery(searchParam);
    }

    if (tagParam) {
      setActiveTags(tagParam.split(","));
    }

    if (viewParam && ["grid", "list"].includes(viewParam)) {
      setViewMode(viewParam);
    }

    if (
      sortParam &&
      ["date", "likes", "downloads", "title"].includes(sortParam)
    ) {
      setSortBy(sortParam);
    }

    // Simulate loading
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
  }, []);

  // Update URL when parameters change
  useEffect(() => {
    const url = new URL(window.location);
    url.searchParams.set("tab", activeTab);

    if (searchQuery) {
      url.searchParams.set("search", searchQuery);
    } else {
      url.searchParams.delete("search");
    }

    if (activeTags.length > 0) {
      url.searchParams.set("tags", activeTags.join(","));
    } else {
      url.searchParams.delete("tags");
    }

    url.searchParams.set("view", viewMode);
    url.searchParams.set("sort", sortBy);

    window.history.pushState({}, "", url);
  }, [activeTab, searchQuery, activeTags, viewMode, sortBy]);

  // Filter and sort images
  useEffect(() => {
    if (!imageCategories[activeTab]) return;

    // Simulate loading
    setIsLoading(true);

    setTimeout(() => {
      let filtered = [...imageCategories[activeTab]];

      // Filter by search query
      if (searchQuery.trim() !== "") {
        const query = searchQuery.toLowerCase();
        filtered = filtered.filter(
          (img) =>
            img.title.toLowerCase().includes(query) ||
            img.alt.toLowerCase().includes(query) ||
            img.tags.some((tag) => tag.toLowerCase().includes(query))
        );
      }

      // Filter by active tags
      if (activeTags.length > 0) {
        filtered = filtered.filter((img) =>
          activeTags.some((tag) => img.tags.includes(tag))
        );
      }

      // Sort results
      filtered.sort((a, b) => {
        switch (sortBy) {
          case "date":
            return new Date(b.date) - new Date(a.date);
          case "likes":
            return b.likes - a.likes;
          case "downloads":
            return b.downloads - a.downloads;
          case "title":
            return a.title.localeCompare(b.title);
          default:
            return 0;
        }
      });

      setFilteredImages(filtered);
      setIsLoading(false);
    }, 500);
  }, [searchQuery, activeTab, activeTags, sortBy]);

  const handleTabChange = (value) => {
    setActiveTab(value);
    // Keep other filters intact
  };

  const toggleTag = (tag) => {
    if (activeTags.includes(tag)) {
      setActiveTags(activeTags.filter((t) => t !== tag));
    } else {
      setActiveTags([...activeTags, tag]);
    }
  };

  const clearFilters = () => {
    setSearchQuery("");
    setActiveTags([]);
  };

  const openImageDialog = (image) => {
    setCurrentImage(image);
    setImageDialogOpen(true);
  };

  const toggleFavorite = (imageId) => {
    if (favorites.includes(imageId)) {
      setFavorites(favorites.filter((id) => id !== imageId));
    } else {
      setFavorites([...favorites, imageId]);
    }
  };

  // Get unique tags from the current category
  const getUniqueTags = () => {
    if (!imageCategories[activeTab]) return [];
    const allTags = imageCategories[activeTab].flatMap((img) => img.tags);
    return [...new Set(allTags)];
  };

  // Count how many images use each tag
  const getTagCounts = () => {
    if (!imageCategories[activeTab]) return {};
    const counts = {};
    imageCategories[activeTab].forEach((img) => {
      img.tags.forEach((tag) => {
        counts[tag] = (counts[tag] || 0) + 1;
      });
    });
    return counts;
  };

  const tagCounts = getTagCounts();

  // Functions for image navigation in dialog
  const getNextImage = () => {
    if (!currentImage) return null;
    const currentIndex = filteredImages.findIndex(
      (img) => img.id === currentImage.id
    );
    if (currentIndex === filteredImages.length - 1) {
      return filteredImages[0]; // Loop back to first
    }
    return filteredImages[currentIndex + 1];
  };

  const getPrevImage = () => {
    if (!currentImage) return null;
    const currentIndex = filteredImages.findIndex(
      (img) => img.id === currentImage.id
    );
    if (currentIndex === 0) {
      return filteredImages[filteredImages.length - 1]; // Loop to last
    }
    return filteredImages[currentIndex - 1];
  };

  const navigateToNext = () => {
    const next = getNextImage();
    if (next) setCurrentImage(next);
  };

  const navigateToPrev = () => {
    const prev = getPrevImage();
    if (prev) setCurrentImage(prev);
  };

  return (
    <div className="min-h-screen text-gray">
      <div className="container mx-auto p-4">
        <header className="mb-6 sticky top-0 z-10 pt-2 pb-4">
          <div className="flex items-center justify-between mb-4">
            <h1 className="text-3xl font-bold flex items-center">
              <Image className="h-6 w-6 mr-2" />
              Media Center
            </h1>
            <div className="flex items-center gap-2">
              <Button variant="ghost" size="icon" className="rounded-full">
                <Settings size={20} />
              </Button>
              <Dialog>
                <DialogTrigger asChild>
                  <Button variant="outline" className="rounded-full">
                    Upload Media
                  </Button>
                </DialogTrigger>
                <DialogContent className="rounded-3xl">
                  <DialogHeader>
                    <DialogTitle>Upload Media</DialogTitle>
                    <DialogDescription className="text-gray-900">
                      Add new images to your collection
                    </DialogDescription>
                  </DialogHeader>
                  <div className="border-2 border-dashed border-gray-700 rounded-lg p-12 text-center">
                    <div className="flex flex-col items-center justify-center gap-2">
                      <Image className="h-12 w-12 text-gray-500" />
                      <p className="text-gray-400">
                        Drag and drop files here or click to browse
                      </p>
                      <Button variant="secondary" className="mt-2 runded-full">
                        Select Files
                      </Button>
                    </div>
                  </div>
                </DialogContent>
              </Dialog>
            </div>
          </div>

          <div className="flex gap-3 items-center flex-wrap">
            <div className="relative flex-1 min-w-64">
              <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
              <Input
                type="text"
                placeholder="Search media..."
                className="pl-10"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              {searchQuery && (
                <Button
                  variant="ghost"
                  size="icon"
                  className="absolute right-1 top-1 h-8 w-8 rounded-full"
                  onClick={() => setSearchQuery("")}
                >
                  <X size={16} />
                </Button>
              )}
            </div>

            <Dialog open={filterDialogOpen} onOpenChange={setFilterDialogOpen}>
              <DialogTrigger asChild>
                <Button
                  variant="outline"
                  className="rounded-full whitespace-nowrap"
                >
                  <Filter className="h-4 w-4 mr-2" />
                  Filter
                  {activeTags.length > 0 && (
                    <Badge variant="secondary" className="ml-2 bg-gray-700">
                      {activeTags.length}
                    </Badge>
                  )}
                </Button>
              </DialogTrigger>
              <DialogContent className="rounded-3xl max-w-md">
                <DialogHeader>
                  <DialogTitle>Filter Media</DialogTitle>
                  <DialogDescription className="text-gray-400">
                    Narrow down your results with tags and filters
                  </DialogDescription>
                </DialogHeader>
                <div className="py-4 max-h-96 overflow-y-auto">
                  <div className="mb-6">
                    <h3 className="text-sm font-medium mb-2">Tags</h3>
                    <div className="flex flex-wrap gap-2">
                      {getUniqueTags().map((tag) => (
                        <Badge
                          key={tag}
                          variant={
                            activeTags.includes(tag) ? "default" : "outline"
                          }
                          className={`cursor-pointer ${
                            activeTags.includes(tag)
                              ? "bg-white text-black"
                              : "hover:bg-gray-800"
                          }`}
                          onClick={() => toggleTag(tag)}
                        >
                          {tag}
                          <span className="ml-1 text-xs opacity-70">
                            ({tagCounts[tag]})
                          </span>
                        </Badge>
                      ))}
                    </div>
                  </div>

                  <div className="mb-6">
                    <h3 className="text-sm font-medium mb-2">Sort By</h3>
                    <Select value={sortBy} onValueChange={setSortBy}>
                      <SelectTrigger className="w-full ">
                        <SelectValue placeholder="Sort by..." />
                      </SelectTrigger>
                      <SelectContent className="">
                        <SelectItem value="date">Date (Newest)</SelectItem>
                        <SelectItem value="likes">Most Liked</SelectItem>
                        <SelectItem value="downloads">
                          Most Downloaded
                        </SelectItem>
                        <SelectItem value="title">Title (A-Z)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="mb-6">
                    <h3 className="text-sm font-medium mb-2">Quality</h3>
                    <div className="flex items-center gap-4">
                      <Slider
                        value={[imageQuality]}
                        min={40}
                        max={100}
                        step={20}
                        onValueChange={(values) => setImageQuality(values[0])}
                        className="flex-1"
                      />
                      <span className="w-12 text-right">{imageQuality}%</span>
                    </div>
                  </div>
                </div>
                <div className="flex justify-between">
                  <Button
                    variant="ghost"
                    onClick={clearFilters}
                    disabled={!searchQuery && activeTags.length === 0}
                    className="rounded-full"
                  >
                    Clear All
                  </Button>
                  <Button
                    variant="outline"
                    onClick={() => setFilterDialogOpen(false)}
                    className="rounded-full"
                  >
                    Apply Filters
                  </Button>
                </div>
              </DialogContent>
            </Dialog>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="outline"
                  className="rounded-full whitespace-nowrap"
                >
                  {sortBy === "date" && "Newest"}
                  {sortBy === "likes" && "Most Liked"}
                  {sortBy === "downloads" && "Most Downloaded"}
                  {sortBy === "title" && "Title (A-Z)"}
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="rounded-3xl">
                <DropdownMenuLabel>Sort By</DropdownMenuLabel>
                <DropdownMenuSeparator className="bg-gray-100" />
                <DropdownMenuItem
                  className={sortBy === "date" ? "bg-gray-100" : ""}
                  onClick={() => setSortBy("date")}
                >
                  Newest
                </DropdownMenuItem>
                <DropdownMenuItem
                  className={sortBy === "likes" ? "bg-gray-100" : ""}
                  onClick={() => setSortBy("likes")}
                >
                  Most Liked
                </DropdownMenuItem>
                <DropdownMenuItem
                  className={sortBy === "downloads" ? "bg-gray-100" : ""}
                  onClick={() => setSortBy("downloads")}
                >
                  Most Downloaded
                </DropdownMenuItem>
                <DropdownMenuItem
                  className={sortBy === "title" ? "bg-gray-100" : ""}
                  onClick={() => setSortBy("title")}
                >
                  Title (A-Z)
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            <div className="flex border rounded-full overflow-hidden">
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      variant="ghost"
                      size="icon"
                      className={`h-9 w-9 rounded-none ${
                        viewMode === "grid"
                          ? "bg-gray-200"
                          : "hover:bg-gray-200"
                      }`}
                      onClick={() => setViewMode("grid")}
                    >
                      <Grid size={16} />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent side="bottom">
                    <p>Grid View</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>

              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      variant="ghost"
                      size="icon"
                      className={`h-9 w-9 rounded-none ${
                        viewMode === "list"
                          ? "bg-gray-200"
                          : "hover:bg-gray-200"
                      }`}
                      onClick={() => setViewMode("list")}
                    >
                      <List size={16} />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent side="bottom">
                    <p>List View</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>
          </div>
        </header>

        <Tabs
          defaultValue={activeTab}
          value={activeTab}
          onValueChange={handleTabChange}
          className="w-full"
        >
          <TabsList className="grid grid-cols-4 mb-6">
            <TabsTrigger
              value="nature"
              className="data-[state=active]:bg-gray-500"
            >
              <div className="flex items-center gap-2">
                <Image className="h-4 w-4" />
                <span>Nature</span>
                <Badge variant="outline" className="ml-1 text-xs">
                  {imageCategories.nature.length}
                </Badge>
              </div>
            </TabsTrigger>
            <TabsTrigger
              value="architecture"
              className="data-[state=active]:bg-gray-500"
            >
              <div className="flex items-center gap-2">
                <Video className="h-4 w-4" />
                <span>Architecture</span>
                <Badge variant="outline" className="ml-1 text-xs">
                  {imageCategories.architecture.length}
                </Badge>
              </div>
            </TabsTrigger>
            <TabsTrigger
              value="abstract"
              className="data-[state=active]:bg-gray-500"
            >
              <div className="flex items-center gap-2">
                <Music className="h-4 w-4" />
                <span>Abstract</span>
                <Badge variant="outline" className="ml-1 text-xs">
                  {imageCategories.abstract.length}
                </Badge>
              </div>
            </TabsTrigger>
            <TabsTrigger
              value="people"
              className="data-[state=active]:bg-gray-500"
            >
              <div className="flex items-center gap-2">
                <File className="h-4 w-4" />
                <span>People</span>
                <Badge variant="outline" className="ml-1 text-xs">
                  {imageCategories.people.length}
                </Badge>
              </div>
            </TabsTrigger>
          </TabsList>

          {Object.keys(imageCategories).map((category) => (
            <TabsContent key={category} value={category} className="mt-0">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-semibold capitalize flex items-center">
                  {category} Images
                  {activeTags.length > 0 && (
                    <span className="text-sm font-normal text-gray-400 ml-4 flex items-center">
                      Filters:
                      {activeTags.map((tag) => (
                        <Badge
                          key={tag}
                          variant="outline"
                          className="ml-2 cursor-pointer hover:bg-gray-800"
                          onClick={() => toggleTag(tag)}
                        >
                          {tag} <X size={12} className="ml-1" />
                        </Badge>
                      ))}
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={clearFilters}
                        className="ml-2 text-xs h-6"
                      >
                        Clear
                      </Button>
                    </span>
                  )}
                </h2>
                <div className="text-sm text-gray-400">
                  {filteredImages.length}{" "}
                  {filteredImages.length === 1 ? "item" : "items"}
                </div>
              </div>

              {isLoading ? (
                <div
                  className={`grid ${
                    viewMode === "grid"
                      ? "grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
                      : "grid-cols-1"
                  } gap-6`}
                >
                  {Array(6)
                    .fill(0)
                    .map((_, i) => (
                      <Card key={i} className="overflow-hidden">
                        <CardContent className="p-0">
                          <Skeleton className="aspect-video" />
                          <div className="p-4">
                            <Skeleton className="h-5 w-3/4 mb-2 bg-gray-800" />
                            <Skeleton className="h-4 w-1/2 bg-gray-800" />
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                </div>
              ) : viewMode === "grid" ? (
                <div
                  className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4"
                  ref={imageContainerRef}
                >
                  {filteredImages.length > 0 ? (
                    filteredImages.map((image) => (
                      <Card
                        key={image.id}
                        className="h-full w-full overflow-hidden group relative"
                        onMouseEnter={() => setIsHovered(image.id)}
                        onMouseLeave={() => setIsHovered(null)}
                      >
                        <div
                          className="aspect-video relative cursor-pointer overflow-hidden"
                          onClick={() => openImageDialog(image)}
                        >
                          <img
                            src={image.src}
                            alt={image.alt}
                            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                          />
                          <div
                            className={`absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center opacity-0 transition-opacity duration-200 ${
                              isHovered === image.id ? "opacity-100" : ""
                            }`}
                          >
                            <Button
                              variant="ghost"
                              size="icon"
                              className="text-white"
                            >
                              <Maximize2 size={24} />
                            </Button>
                          </div>
                        </div>
                        <CardContent className="p-3">
                          <div className="flex justify-between items-start mb-1">
                            <h3 className="font-medium text-sm truncate">
                              {image.title}
                            </h3>
                            <Button
                              variant="ghost"
                              size="icon"
                              className="h-6 w-6 ml-2 text-gray-400 hover:text-white"
                              onClick={() => toggleFavorite(image.id)}
                            >
                              <Heart
                                size={16}
                                className={
                                  favorites.includes(image.id)
                                    ? "fill-red-500 text-red-500"
                                    : ""
                                }
                              />
                            </Button>
                          </div>
                          <div className="flex flex-wrap gap-1 mb-2">
                            {image.tags.slice(0, 3).map((tag) => (
                              <Badge
                                key={tag}
                                variant="outline"
                                className="text-xs py-0 cursor-pointer hover:bg-gray-800"
                                onClick={() => toggleTag(tag)}
                              >
                                {tag}
                              </Badge>
                            ))}
                          </div>
                        </CardContent>
                        <CardFooter className="p-3 pt-0 text-xs text-gray-400 flex justify-between">
                          <div className="flex items-center gap-4">
                            <div className="flex items-center">
                              <Heart size={12} className="mr-1" />
                              {formatNumber(image.likes)}
                            </div>
                            <div className="flex items-center">
                              <Download size={12} className="mr-1" />
                              {formatNumber(image.downloads)}
                            </div>
                          </div>
                          <div>{new Date(image.date).toLocaleDateString()}</div>
                        </CardFooter>
                      </Card>
                    ))
                  ) : (
                    <div className="col-span-full py-16 text-center">
                      <div className="flex flex-col items-center justify-center gap-2">
                        <Image className="h-16 w-16 text-gray-700 mb-2" />
                        <h3 className="text-xl font-medium">No images found</h3>
                        <p className="text-gray-400 max-w-md">
                          Try adjusting your search or filters to find what
                          you're looking for.
                        </p>
                        <Button
                          variant="outline"
                          className="mt-4"
                          onClick={clearFilters}
                        >
                          Clear filters
                        </Button>
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                <div className="space-y-2">
                  {filteredImages.length > 0 ? (
                    filteredImages.map((image) => (
                      <Card
                        key={image.id}
                        className="bg-gray-900 border-gray-800 overflow-hidden"
                      >
                        <div className="flex items-center p-3">
                          <div
                            className="w-24 h-16 rounded overflow-hidden mr-4 cursor-pointer"
                            onClick={() => openImageDialog(image)}
                          >
                            <img
                              src={image.src}
                              alt={image.alt}
                              className="w-full h-full object-cover"
                            />
                          </div>
                          <div className="flex-1">
                            <div className="flex justify-between items-start">
                              <h3 className="font-medium">{image.title}</h3>
                              <div className="flex items-center gap-1">
                                <Button
                                  variant="ghost"
                                  size="icon"
                                  className="h-8 w-8 text-gray-400 hover:text-white"
                                  onClick={() => toggleFavorite(image.id)}
                                >
                                  <Heart
                                    size={16}
                                    className={
                                      favorites.includes(image.id)
                                        ? "fill-red-500 text-red-500"
                                        : ""
                                    }
                                  />
                                </Button>
                                <Button
                                  variant="ghost"
                                  size="icon"
                                  className="h-8 w-8 text-gray-400 hover:text-white"
                                >
                                  <Download size={16} />
                                </Button>
                                <Button
                                  variant="ghost"
                                  size="icon"
                                  className="h-8 w-8 text-gray-400 hover:text-white"
                                >
                                  <Share2 size={16} />
                                </Button>
                              </div>
                            </div>
                            <div className="flex flex-wrap gap-1 mt-1">
                              {image.tags.map((tag) => (
                                <Badge
                                  key={tag}
                                  variant="outline"
                                  className="text-xs py-0 cursor-pointer hover:bg-gray-800"
                                  onClick={() => toggleTag(tag)}
                                >
                                  {tag}
                                </Badge>
                              ))}
                            </div>
                            <div className="flex items-center gap-4 mt-2 text-xs text-gray-400">
                              <div className="flex items-center">
                                <Heart size={12} className="mr-1" />
                                {formatNumber(image.likes)}
                              </div>
                              <div className="flex items-center">
                                <Download size={12} className="mr-1" />
                                {formatNumber(image.downloads)}
                              </div>
                              <div>
                                {new Date(image.date).toLocaleDateString()}
                              </div>
                            </div>
                          </div>
                        </div>
                      </Card>
                    ))
                  ) : (
                    <div className="py-16 text-center">
                      <div className="flex flex-col items-center justify-center gap-2">
                        <Image className="h-16 w-16 text-gray-700 mb-2" />
                        <h3 className="text-xl font-medium">No images found</h3>
                        <p className="text-gray-400 max-w-md">
                          Try adjusting your search or filters to find what
                          you're looking for.
                        </p>
                        <Button
                          variant="outline"
                          className="mt-4"
                          onClick={clearFilters}
                        >
                          Clear filters
                        </Button>
                      </div>
                    </div>
                  )}
                </div>
              )}
            </TabsContent>
          ))}
        </Tabs>
      </div>

      {/* Image Detail Dialog */}
      <Dialog open={imageDialogOpen} onOpenChange={setImageDialogOpen}>
        <DialogContent className="max-w-5xl p-0 bg-gray-900 border-gray-800 text-white">
          {currentImage && (
            <div className="relative">
              <div className="absolute top-4 right-4 z-10 flex gap-2">
                <Button
                  variant="outline"
                  size="icon"
                  className="h-8 w-8 rounded-full bg-black bg-opacity-50 border-gray-600 hover:bg-opacity-70"
                  onClick={() => toggleFavorite(currentImage.id)}
                >
                  <Heart
                    size={16}
                    className={
                      favorites.includes(currentImage.id)
                        ? "fill-red-500 text-red-500"
                        : ""
                    }
                  />
                </Button>
                <Button
                  variant="outline"
                  size="icon"
                  className="h-8 w-8 rounded-full bg-black bg-opacity-50 border-gray-600 hover:bg-opacity-70"
                >
                  <Download size={16} />
                </Button>
                <Button
                  variant="outline"
                  size="icon"
                  className="h-8 w-8 rounded-full bg-black bg-opacity-50 border-gray-600 hover:bg-opacity-70"
                >
                  <Share2 size={16} />
                </Button>
                <Button
                  variant="outline"
                  size="icon"
                  className="h-8 w-8 rounded-full bg-black bg-opacity-50 border-gray-600 hover:bg-opacity-70"
                  onClick={() => setImageDialogOpen(false)}
                >
                  <X size={16} />
                </Button>
              </div>

              <div className="relative aspect-video">
                <img
                  src={currentImage.src}
                  alt={currentImage.alt}
                  className="w-full h-full object-contain"
                />

                <Button
                  variant="outline"
                  size="icon"
                  className="absolute left-4 top-1/2 -translate-y-1/2 h-10 w-10 rounded-full bg-black bg-opacity-50 border-gray-600 hover:bg-opacity-70"
                  onClick={navigateToPrev}
                >
                  <ChevronLeft size={20} />
                </Button>

                <Button
                  variant="outline"
                  size="icon"
                  className="absolute right-4 top-1/2 -translate-y-1/2 h-10 w-10 rounded-full bg-black bg-opacity-50 border-gray-600 hover:bg-opacity-70"
                  onClick={navigateToNext}
                >
                  <ChevronRight size={20} />
                </Button>
              </div>

              <div className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h2 className="text-2xl font-medium mb-1">
                      {currentImage.title}
                    </h2>
                    <p className="text-gray-400">{currentImage.alt}</p>
                  </div>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="text-gray-400 hover:text-white"
                      >
                        <MoreHorizontal size={20} />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="text-gray">
                      <DropdownMenuItem>
                        <Info size={16} className="mr-2" /> View Details
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <Bookmark size={16} className="mr-2" /> Add to
                        Collection
                      </DropdownMenuItem>
                      <DropdownMenuSeparator className="bg-gray-700" />
                      <DropdownMenuItem className="text-red-500">
                        <X size={16} className="mr-2" /> Remove
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>

                <div className="flex flex-wrap gap-2 mb-6">
                  {currentImage.tags.map((tag) => (
                    <Badge
                      key={tag}
                      variant="outline"
                      className="cursor-pointer hover:bg-gray-800"
                      onClick={() => {
                        toggleTag(tag);
                        setImageDialogOpen(false);
                      }}
                    >
                      {tag}
                    </Badge>
                  ))}
                </div>

                <div className="flex items-center gap-6 text-gray-400">
                  <div className="flex items-center">
                    <Heart size={16} className="mr-2" />
                    {formatNumber(currentImage.likes)} likes
                  </div>
                  <div className="flex items-center">
                    <Download size={16} className="mr-2" />
                    {formatNumber(currentImage.downloads)} downloads
                  </div>
                  <div className="flex items-center">
                    <Calendar size={16} className="mr-2" />
                    {new Date(currentImage.date).toLocaleDateString()}
                  </div>
                </div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
