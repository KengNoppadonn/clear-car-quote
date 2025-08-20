import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { carBrands, carModels, sampleOffers, insurers, plans } from "@/data/mockData";
import { ChevronRight, Zap } from "lucide-react";

const CarInsurancePremium = () => {
  const [selectedClass, setSelectedClass] = useState<string>("1");

  const popularBrands = carBrands.filter(brand => brand.popular);
  const evModels = carModels.filter(model => 
    model.name.includes('ATTO') || model.name.includes('DOLPHIN') || model.name.includes('MG4')
  );

  const getModelOffers = (modelId: string) => {
    return sampleOffers
      .filter(offer => offer.modelId === modelId)
      .slice(0, 3) // Top 3 offers per model
      .map(offer => {
        const plan = plans.find(p => p.id === offer.planId);
        const insurer = insurers.find(i => i.id === plan?.insurerId);
        return { offer, plan, insurer };
      })
      .filter(item => item.plan && item.insurer);
  };

  return (
    <div className="min-h-screen bg-surface">
      {/* Page Header */}
      <div className="bg-light-blue border-b border-border">
        <div className="container mx-auto px-4 py-8">
          <nav className="text-sm text-muted-foreground mb-4">
            หน้าแรก <ChevronRight className="inline w-4 h-4 mx-2" /> ราคาประกันรถยนต์
          </nav>
          <h1 className="text-3xl font-bold text-foreground mb-4">
            ราคาประกันรถยนต์
          </h1>
          <p className="text-lg text-muted-foreground">
            เช็คราคาประกันรถยนต์ยอดนิยม เปรียบเทียบราคาและความคุ้มครอง
            <br />
            ค้นหาแผนประกันที่เหมาะกับคุณในราคาที่คุ้มค่า
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        {/* Class Tabs */}
        <Tabs value={selectedClass} onValueChange={setSelectedClass} className="mb-8">
          <TabsList className="grid w-full grid-cols-5 lg:w-auto lg:inline-flex">
            <TabsTrigger value="1">ประกันชั้น 1</TabsTrigger>
            <TabsTrigger value="2+">ประกันชั้น 2+</TabsTrigger>
            <TabsTrigger value="3+">ประกันชั้น 3+</TabsTrigger>
            <TabsTrigger value="2">ประกันชั้น 2</TabsTrigger>
            <TabsTrigger value="3">ประกันชั้น 3</TabsTrigger>
          </TabsList>

          {/* Brand Strip */}
          <div className="mt-8 mb-8">
            <h2 className="text-xl font-semibold text-foreground mb-4">
              เลือกยี่ห้อรถยนต์ยอดนิยม
            </h2>
            <p className="text-sm text-muted-foreground mb-4">
              เห็นราคาเร็ว ไม่ต้องให้ข้อมูลส่วนตัว
            </p>
            <div className="grid grid-cols-3 md:grid-cols-6 lg:grid-cols-8 gap-4">
              {popularBrands.map((brand) => (
                <Button
                  key={brand.id}
                  variant="outline"
                  className="h-16 flex flex-col items-center justify-center p-2"
                >
                  <div className="w-12 h-6 bg-gray-200 rounded mb-1 flex items-center justify-center">
                    <span className="text-xs font-medium">{brand.name}</span>
                  </div>
                  <span className="text-xs">{brand.name}</span>
                </Button>
              ))}
            </div>
          </div>

          {/* Popular Models by Class */}
          <TabsContent value={selectedClass} className="space-y-8">
            <div>
              <h2 className="text-xl font-semibold text-foreground mb-6">
                ราคาประกันรถยนต์ยอดนิยม - ชั้น {selectedClass}
              </h2>
              
              <div className="grid gap-6">
                {carModels.slice(0, 6).map((model) => {
                  const brand = carBrands.find(b => b.id === model.brandId);
                  const offers = getModelOffers(model.id);
                  
                  if (offers.length === 0) return null;

                  return (
                    <Card key={model.id} className="overflow-hidden">
                      <CardHeader className="pb-4">
                        <div className="flex items-center justify-between">
                          <CardTitle className="text-lg">
                            {brand?.name} {model.name}
                          </CardTitle>
                          <div className="flex gap-2">
                            {model.name.includes('ATTO') || model.name.includes('DOLPHIN') || model.name.includes('MG4') ? (
                              <Badge variant="secondary" className="bg-green-100 text-green-800">
                                <Zap className="w-3 h-3 mr-1" />
                                EV
                              </Badge>
                            ) : null}
                          </div>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <div className="grid gap-4">
                          {offers.map(({ offer, plan, insurer }, index) => (
                            <div key={offer.id} className="flex items-center justify-between p-4 bg-light-blue rounded-lg">
                              <div className="flex items-center gap-4">
                                <img
                                  src={insurer!.logoUrl}
                                  alt={insurer!.name}
                                  className="w-12 h-6 object-contain bg-white rounded border p-1"
                                />
                                <div>
                                  <h4 className="font-medium text-foreground">
                                    {insurer!.name}
                                  </h4>
                                  <div className="flex gap-2 mt-1">
                                    {offer.badges.map((badge) => (
                                      <Badge key={badge} variant="secondary" className="text-xs">
                                        {badge}
                                      </Badge>
                                    ))}
                                  </div>
                                </div>
                              </div>
                              <div className="text-right">
                                <div className="text-lg font-bold text-primary">
                                  ฿{offer.annualPremium.toLocaleString()}
                                </div>
                                <div className="text-sm text-muted-foreground">ต่อปี</div>
                              </div>
                              <div className="flex gap-2">
                                <Button size="sm" variant="outline">
                                  สนใจ
                                </Button>
                                <Button size="sm">
                                  ดูแผนรุ่นนี้
                                </Button>
                              </div>
                            </div>
                          ))}
                        </div>
                        
                        <div className="mt-4 p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
                          <p className="text-xs text-yellow-800">
                            <strong>หมายเหตุ:</strong> ราคาจำลองเพื่อประกอบการเปรียบเทียบ 
                            ราคาอาจเปลี่ยนตามรุ่นย่อย/ปีจดทะเบียน/เงื่อนไข
                          </p>
                        </div>
                      </CardContent>
                    </Card>
                  );
                })}
              </div>
            </div>
          </TabsContent>
        </Tabs>

        {/* EV Highlight Section */}
        <div className="mt-12 mb-8">
          <Card className="bg-gradient-to-r from-green-50 to-blue-50 border-green-200">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-green-800">
                <Zap className="w-5 h-5" />
                รถยนต์ไฟฟ้า (EV) - ประกันพิเศษ
              </CardTitle>
              <p className="text-green-700">
                ประกันรถยนต์ไฟฟ้าด้วยความคุ้มครองที่เหมาะสม รับส่วนลดพิเศษ
              </p>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                {evModels.map((model) => {
                  const brand = carBrands.find(b => b.id === model.brandId);
                  const offers = getModelOffers(model.id);
                  const bestOffer = offers[0]?.offer;
                  
                  if (!bestOffer) return null;

                  return (
                    <div key={model.id} className="p-4 bg-white rounded-lg border">
                      <h4 className="font-semibold text-foreground mb-2">
                        {brand?.name} {model.name}
                      </h4>
                      <div className="text-lg font-bold text-primary mb-2">
                        เริ่มต้น ฿{bestOffer.annualPremium.toLocaleString()}
                      </div>
                      <Badge variant="secondary" className="bg-green-100 text-green-800 mb-3">
                        ลดเบี้ย 15%
                      </Badge>
                      <Button className="w-full" size="sm">
                        ดูรายละเอียด
                      </Button>
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Top Insurers */}
        <div className="mt-12">
          <h2 className="text-xl font-semibold text-foreground mb-6">
            บริษัทประกันชั้นนำ / ราคาเริ่มต้น
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-4">
            {insurers.map((insurer) => (
              <Card key={insurer.id} className="text-center p-4">
                <img
                  src={insurer.logoUrl}
                  alt={insurer.name}
                  className="w-12 h-6 object-contain mx-auto mb-2 bg-white rounded border p-1"
                />
                <h4 className="text-sm font-medium text-foreground mb-1">
                  {insurer.name}
                </h4>
                <div className="text-xs text-primary font-semibold">
                  เริ่มต้น 12,900*
                </div>
              </Card>
            ))}
          </div>
          <p className="text-xs text-muted-foreground mt-4">
            *อ้างอิงรุ่นยอดนิยม เช่น TOYOTA YARIS 1.2
          </p>
        </div>
      </div>
    </div>
  );
};

export default CarInsurancePremium;