import { useState, useMemo } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import { Checkbox } from "@/components/ui/checkbox";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Heart, ShoppingCart, Star } from "lucide-react";
import { sampleOffers, insurers, plans, carModels } from "@/data/mockData";

const Compare = () => {
  const [priceRange, setPriceRange] = useState([10000, 50000]);
  const [repairCenter, setRepairCenter] = useState(false);
  const [installmentOnly, setInstallmentOnly] = useState(false);
  const [selectedClass, setSelectedClass] = useState<string>("all");
  const [sortBy, setSortBy] = useState("price");

  const filteredOffers = useMemo(() => {
    return sampleOffers.filter(offer => {
      const plan = plans.find(p => p.id === offer.planId);
      if (!plan) return false;

      // Price filter
      if (offer.annualPremium < priceRange[0] || offer.annualPremium > priceRange[1]) return false;

      // Class filter
      if (selectedClass !== "all" && plan.class !== selectedClass) return false;

      // Repair center filter
      if (repairCenter && plan.repairType !== "ศูนย์") return false;

      // Installment filter
      if (installmentOnly && !offer.installmentAvailable) return false;

      return true;
    });
  }, [priceRange, selectedClass, repairCenter, installmentOnly]);

  const sortedOffers = useMemo(() => {
    return [...filteredOffers].sort((a, b) => {
      switch (sortBy) {
        case "price":
          return a.annualPremium - b.annualPremium;
        case "popularity":
          return b.popularity - a.popularity;
        default:
          return 0;
      }
    });
  }, [filteredOffers, sortBy]);

  return (
    <div className="min-h-screen bg-surface">
      {/* Filter Bar */}
      <div className="sticky top-20 z-40 bg-background border-b border-border shadow-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex flex-wrap gap-4 items-center">
            <div className="flex gap-2">
              {["all", "1", "2+", "3+", "2", "3"].map((cls) => (
                <Button
                  key={cls}
                  variant={selectedClass === cls ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSelectedClass(cls)}
                >
                  {cls === "all" ? "ทั้งหมด" : `ชั้น ${cls}`}
                </Button>
              ))}
            </div>
            
            <div className="flex items-center gap-2">
              <span className="text-sm text-muted-foreground">ราคา:</span>
              <div className="w-32">
                <Slider
                  value={priceRange}
                  onValueChange={setPriceRange}
                  min={5000}
                  max={100000}
                  step={1000}
                  className="w-full"
                />
              </div>
              <span className="text-sm text-muted-foreground">
                {priceRange[0].toLocaleString()}-{priceRange[1].toLocaleString()}
              </span>
            </div>

            <div className="flex items-center gap-2">
              <Switch
                checked={repairCenter}
                onCheckedChange={setRepairCenter}
              />
              <span className="text-sm">ซ่อมศูนย์</span>
            </div>

            <div className="flex items-center gap-2">
              <Checkbox
                checked={installmentOnly}
                onCheckedChange={(checked) => setInstallmentOnly(checked as boolean)}
              />
              <span className="text-sm">ผ่อนได้</span>
            </div>

            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger className="w-32">
                <SelectValue placeholder="เรียงตาม" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="price">ราคา (ต่ำ→สูง)</SelectItem>
                <SelectItem value="popularity">ความนิยม</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>

      {/* Results */}
      <div className="container mx-auto px-4 py-8">
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-foreground mb-2">
            เปรียบเทียบประกันรถยนต์
          </h1>
          <p className="text-muted-foreground">
            พบ {sortedOffers.length} แผนประกันที่เหมาะกับคุณ
          </p>
        </div>

        <div className="grid gap-4">
          {sortedOffers.map((offer) => {
            const plan = plans.find(p => p.id === offer.planId);
            const insurer = insurers.find(i => i.id === plan?.insurerId);
            const model = carModels.find(m => m.id === offer.modelId);

            if (!plan || !insurer || !model) return null;

            return (
              <Card key={offer.id} className="overflow-hidden">
                <CardContent className="p-6">
                  <div className="flex flex-col lg:flex-row lg:items-center gap-4">
                    {/* Insurer Logo */}
                    <div className="flex-shrink-0">
                      <img
                        src={insurer.logoUrl}
                        alt={insurer.name}
                        className="w-16 h-8 object-contain bg-white rounded border p-1"
                      />
                    </div>

                    {/* Plan Info */}
                    <div className="flex-1">
                      <div className="flex flex-wrap gap-2 mb-2">
                        {offer.badges.map((badge) => (
                          <Badge key={badge} variant="secondary">
                            {badge}
                          </Badge>
                        ))}
                      </div>
                      <h3 className="font-semibold text-lg text-foreground mb-1">
                        {plan.name} - {insurer.name}
                      </h3>
                      <p className="text-sm text-muted-foreground mb-2">
                        {plan.repairType} • ค่าเสียหายส่วนแรก {plan.deductible.toLocaleString()} บาท
                      </p>
                      <div className="flex items-center gap-4">
                        <div className="flex items-center gap-1">
                          <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                          <span className="text-sm text-muted-foreground">
                            {insurer.rating}/5
                          </span>
                        </div>
                        <span className="text-sm text-muted-foreground">
                          ความนิยม {offer.popularity}%
                        </span>
                      </div>
                    </div>

                    {/* Price */}
                    <div className="text-right">
                      <div className="text-2xl font-bold text-primary">
                        ฿{offer.annualPremium.toLocaleString()}
                      </div>
                      <div className="text-sm text-muted-foreground">ต่อปี</div>
                      {offer.installmentAvailable && (
                        <div className="text-xs text-green-600 mt-1">
                          ผ่อนได้ ฿{Math.round(offer.annualPremium / 12).toLocaleString()}/เดือน
                        </div>
                      )}
                    </div>

                    {/* Actions */}
                    <div className="flex flex-col gap-2">
                      <Button size="sm" className="w-full lg:w-auto">
                        เลือกแผนนี้
                      </Button>
                      <Button variant="outline" size="sm" className="w-full lg:w-auto">
                        <Heart className="w-4 h-4 mr-1" />
                        เปรียบเทียบ
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {sortedOffers.length === 0 && (
          <Card className="text-center py-12">
            <CardContent>
              <h3 className="text-lg font-semibold text-foreground mb-2">
                ไม่พบแผนประกันที่ตรงกับเงื่อนไข
              </h3>
              <p className="text-muted-foreground mb-4">
                ลองปรับเงื่อนไขการค้นหาเพื่อดูแผนประกันเพิ่มเติม
              </p>
              <Button
                variant="outline"
                onClick={() => {
                  setSelectedClass("all");
                  setPriceRange([5000, 100000]);
                  setRepairCenter(false);
                  setInstallmentOnly(false);
                }}
              >
                รีเซ็ตตัวกรอง
              </Button>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default Compare;