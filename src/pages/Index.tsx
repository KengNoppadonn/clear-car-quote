import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { ArrowRight, Shield, Clock, Users, Star, Zap, Heart, Phone, CreditCard, Check, X } from "lucide-react";
import { carBrands, carModels, sampleOffers, insurers, plans, promotions, articles } from "@/data/mockData";
import heroInsuranceImage from "@/assets/hero-insurance.jpg";

const Index = () => {
  const [selectedBrand, setSelectedBrand] = useState("");
  const [selectedModel, setSelectedModel] = useState("");
  const [selectedYear, setSelectedYear] = useState("");
  const [selectedClass, setSelectedClass] = useState("");
  const navigate = useNavigate();

  const availableModels = selectedBrand 
    ? carModels.filter(model => model.brandId === selectedBrand)
    : [];

  const availableYears = selectedModel 
    ? (() => {
        const model = carModels.find(m => m.id === selectedModel);
        if (!model) return [];
        const years = [];
        for (let year = model.yearTo; year >= model.yearFrom; year--) {
          years.push(year);
        }
        return years;
      })()
    : [];

  const handleQuoteSubmit = () => {
    if (selectedBrand && selectedModel && selectedYear && selectedClass) {
      navigate(`/compare?brand=${selectedBrand}&model=${selectedModel}&year=${selectedYear}&class=${selectedClass}`);
    }
  };

  const handleContactCallback = () => {
    navigate('/contact');
  };

  const handleInstallment = () => {
    navigate('/promotions');
  };

  const previewOffers = sampleOffers.slice(0, 9).map(offer => {
    const plan = plans.find(p => p.id === offer.planId);
    const insurer = insurers.find(i => i.id === plan?.insurerId);
    const model = carModels.find(m => m.id === offer.modelId);
    const brand = carBrands.find(b => b.id === model?.brandId);
    return { offer, plan, insurer, model, brand };
  }).filter(item => item.plan && item.insurer && item.model && item.brand);

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-primary via-primary-hover to-primary-pressed overflow-hidden">
        <div className="absolute inset-0">
          <img 
            src={heroInsuranceImage} 
            alt="Car Insurance" 
            className="w-full h-full object-cover opacity-20"
          />
          <div className="absolute inset-0 bg-primary/80"></div>
        </div>
        <div className="relative container mx-auto px-4 py-16 lg:py-24">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="text-white">
              <Badge className="bg-white/20 text-white border-white/30 mb-6">
                ตรวจสอบประกันรถยนต์
              </Badge>
              
              <h1 className="text-3xl lg:text-5xl font-bold mb-6 leading-tight">
                INSURANCE<br />
                <span className="text-yellow-300">CHECK</span>
              </h1>
              
              <div className="space-y-3 mb-8">
                <div className="flex items-center gap-3">
                  <Check className="w-5 h-5 text-green-300" />
                  <span className="text-lg">เปรียบเทียบราคาจาก 25+ บริษัท</span>
                </div>
                <div className="flex items-center gap-3">
                  <Check className="w-5 h-5 text-green-300" />
                  <span className="text-lg">ดูรายละเอียดความคุ้มครอง</span>
                </div>
                <div className="flex items-center gap-3">
                  <Check className="w-5 h-5 text-green-300" />
                  <span className="text-lg">เช็คราคาง่าย ภายใน 3 นาที</span>
                </div>
              </div>
            </div>

            {/* Quote Form */}
            <div className="lg:col-span-1">
              <Card className="bg-white/95 backdrop-blur-sm shadow-2xl">
                <CardHeader className="pb-4">
                  <CardTitle className="text-foreground text-center">
                    เช็คราคาประกันรถยนต์
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-6">
                  <div className="space-y-4 mb-6">
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-2">
                        ยี่ห้อรถ
                      </label>
                      <Select value={selectedBrand} onValueChange={setSelectedBrand}>
                        <SelectTrigger>
                          <SelectValue placeholder="เลือกยี่ห้อ" />
                        </SelectTrigger>
                        <SelectContent>
                          {carBrands.map((brand) => (
                            <SelectItem key={brand.id} value={brand.id}>
                              {brand.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-foreground mb-2">
                        รุ่นรถ
                      </label>
                      <Select 
                        value={selectedModel} 
                        onValueChange={setSelectedModel}
                        disabled={!selectedBrand}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="เลือกรุ่น" />
                        </SelectTrigger>
                        <SelectContent>
                          {availableModels.map((model) => (
                            <SelectItem key={model.id} value={model.id}>
                              {model.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-foreground mb-2">
                        ปีจดทะเบียน
                      </label>
                      <Select 
                        value={selectedYear} 
                        onValueChange={setSelectedYear}
                        disabled={!selectedModel}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="เลือกปี" />
                        </SelectTrigger>
                        <SelectContent>
                          {availableYears.map((year) => (
                            <SelectItem key={year} value={year.toString()}>
                              {year}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-foreground mb-2">
                        ชั้นประกัน
                      </label>
                      <div className="grid grid-cols-5 gap-2">
                        {["1", "2+", "3+", "2", "3"].map((cls) => (
                          <Button
                            key={cls}
                            variant={selectedClass === cls ? "default" : "outline"}
                            size="sm"
                            onClick={() => setSelectedClass(cls)}
                          >
                            {cls}
                          </Button>
                        ))}
                      </div>
                    </div>
                </div>

                  <div className="space-y-3">
                    <Button 
                      size="lg" 
                      className="w-full"
                      onClick={handleQuoteSubmit}
                      disabled={!selectedBrand || !selectedModel || !selectedYear || !selectedClass}
                    >
                      เช็คราคา
                    </Button>
                    <Button 
                      variant="outline" 
                      size="lg"
                      className="w-full"
                      onClick={handleContactCallback}
                    >
                      <Phone className="w-4 h-4 mr-2" />
                      ให้เราติดต่อกลับ
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Partner Logos */}
      <section className="py-12 bg-background border-b border-border">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-4 md:grid-cols-8 gap-6 items-center opacity-60">
            {insurers.map((insurer) => (
              <div key={insurer.id} className="text-center">
                <img
                  src={insurer.logoUrl}
                  alt={insurer.name}
                  className="w-full h-8 object-contain mx-auto grayscale hover:grayscale-0 transition-all"
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Insurance Company Grid */}
      <section className="py-16 bg-surface">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-foreground mb-4">
              บริษัทประกันชั้นนำ
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              เปรียบเทียบประกันจากบริษัทที่เชื่อถือได้
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-4">
            {insurers.map((insurer) => (
              <Card key={insurer.id} className="p-6 text-center hover:shadow-md transition-shadow">
                <img
                  src={insurer.logoUrl}
                  alt={insurer.name}
                  className="w-full h-12 object-contain mx-auto mb-3"
                />
                <h3 className="text-sm font-medium text-foreground mb-1">
                  {insurer.name}
                </h3>
                <div className="flex items-center justify-center gap-1">
                  <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                  <span className="text-xs text-muted-foreground">{insurer.rating}</span>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Comparison Table */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-foreground mb-4">
              เปรียบเทียบความคุ้มครองประกันรถยนต์
            </h2>
            <p className="text-lg text-muted-foreground">
              ดูรายละเอียดความคุ้มครองแต่ละประเภท
            </p>
          </div>

          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[200px]">รายการคุ้มครอง</TableHead>
                  <TableHead className="text-center">ชั้น 1</TableHead>
                  <TableHead className="text-center">ชั้น 2+</TableHead>
                  <TableHead className="text-center">ชั้น 3+</TableHead>
                  <TableHead className="text-center">ชั้น 2</TableHead>
                  <TableHead className="text-center">ชั้น 3</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <TableRow>
                  <TableCell className="font-medium">คุ้มครองตัวรถ</TableCell>
                  <TableCell className="text-center"><Check className="w-5 h-5 text-green-500 mx-auto" /></TableCell>
                  <TableCell className="text-center"><Check className="w-5 h-5 text-green-500 mx-auto" /></TableCell>
                  <TableCell className="text-center"><Check className="w-5 h-5 text-green-500 mx-auto" /></TableCell>
                  <TableCell className="text-center"><X className="w-5 h-5 text-red-500 mx-auto" /></TableCell>
                  <TableCell className="text-center"><X className="w-5 h-5 text-red-500 mx-auto" /></TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium">ซ่อมอู่/ศูนย์</TableCell>
                  <TableCell className="text-center">ศูนย์</TableCell>
                  <TableCell className="text-center">ศูนย์</TableCell>
                  <TableCell className="text-center">อู่</TableCell>
                  <TableCell className="text-center">-</TableCell>
                  <TableCell className="text-center">-</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium">ค่าเสียหายส่วนแรก</TableCell>
                  <TableCell className="text-center">ไม่มี</TableCell>
                  <TableCell className="text-center">ไม่มี</TableCell>
                  <TableCell className="text-center">5,000</TableCell>
                  <TableCell className="text-center">-</TableCell>
                  <TableCell className="text-center">-</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium">รถชน คน (ต่อคน)</TableCell>
                  <TableCell className="text-center"><Check className="w-5 h-5 text-green-500 mx-auto" /></TableCell>
                  <TableCell className="text-center"><Check className="w-5 h-5 text-green-500 mx-auto" /></TableCell>
                  <TableCell className="text-center"><Check className="w-5 h-5 text-green-500 mx-auto" /></TableCell>
                  <TableCell className="text-center"><Check className="w-5 h-5 text-green-500 mx-auto" /></TableCell>
                  <TableCell className="text-center"><Check className="w-5 h-5 text-green-500 mx-auto" /></TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium">รถชน ทรัพย์</TableCell>
                  <TableCell className="text-center"><Check className="w-5 h-5 text-green-500 mx-auto" /></TableCell>
                  <TableCell className="text-center"><Check className="w-5 h-5 text-green-500 mx-auto" /></TableCell>
                  <TableCell className="text-center"><Check className="w-5 h-5 text-green-500 mx-auto" /></TableCell>
                  <TableCell className="text-center"><Check className="w-5 h-5 text-green-500 mx-auto" /></TableCell>
                  <TableCell className="text-center"><Check className="w-5 h-5 text-green-500 mx-auto" /></TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium">รถสูญหาย</TableCell>
                  <TableCell className="text-center"><Check className="w-5 h-5 text-green-500 mx-auto" /></TableCell>
                  <TableCell className="text-center"><Check className="w-5 h-5 text-green-500 mx-auto" /></TableCell>
                  <TableCell className="text-center"><X className="w-5 h-5 text-red-500 mx-auto" /></TableCell>
                  <TableCell className="text-center"><X className="w-5 h-5 text-red-500 mx-auto" /></TableCell>
                  <TableCell className="text-center"><X className="w-5 h-5 text-red-500 mx-auto" /></TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium">ไฟไหม้</TableCell>
                  <TableCell className="text-center"><Check className="w-5 h-5 text-green-500 mx-auto" /></TableCell>
                  <TableCell className="text-center"><Check className="w-5 h-5 text-green-500 mx-auto" /></TableCell>
                  <TableCell className="text-center"><Check className="w-5 h-5 text-green-500 mx-auto" /></TableCell>
                  <TableCell className="text-center"><X className="w-5 h-5 text-red-500 mx-auto" /></TableCell>
                  <TableCell className="text-center"><X className="w-5 h-5 text-red-500 mx-auto" /></TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium">อุทกภัย</TableCell>
                  <TableCell className="text-center"><Check className="w-5 h-5 text-green-500 mx-auto" /></TableCell>
                  <TableCell className="text-center"><X className="w-5 h-5 text-red-500 mx-auto" /></TableCell>
                  <TableCell className="text-center"><X className="w-5 h-5 text-red-500 mx-auto" /></TableCell>
                  <TableCell className="text-center"><X className="w-5 h-5 text-red-500 mx-auto" /></TableCell>
                  <TableCell className="text-center"><X className="w-5 h-5 text-red-500 mx-auto" /></TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </div>
        </div>
      </section>

      {/* Insurance Plan Details */}
      <section className="py-16 bg-light-blue">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-foreground mb-4">
              ประกันรถยนต์แบบไหนดี? เหมาะกับคุณ?
            </h2>
          </div>

          <div className="space-y-8">
            {/* Class 1 */}
            <Card>
              <CardHeader>
                <CardTitle className="text-xl text-primary">
                  ประกันชั้น 1 - ครอบคลุมทุกความเสี่ยง
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-semibold text-foreground mb-3">ความคุ้มครอง</h4>
                    <ul className="space-y-2 text-sm text-muted-foreground">
                      <li>• คุ้มครองตัวรถเต็มราคา</li>
                      <li>• ซ่อมศูนย์ได้ทุกเครือข่าย</li>
                      <li>• ไม่มีค่าเสียหายส่วนแรก</li>
                      <li>• คุ้มครองรถสูญหาย ไฟไหม้ อุทกภัย</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-semibold text-foreground mb-3">เหมาะกับ</h4>
                    <ul className="space-y-2 text-sm text-muted-foreground">
                      <li>• รถใหม่ รถแพง</li>
                      <li>• ขับในเมือง จราจรหนาแน่น</li>
                      <li>• ต้องการความสบายใจสูงสุด</li>
                      <li>• มีงบประมาณเพียงพอ</li>
                    </ul>
                  </div>
                </div>
                <div className="mt-4">
                  <Button>ดูรายละเอียดเพิ่มเติม</Button>
                </div>
              </CardContent>
            </Card>

            {/* Class 2+ */}
            <Card>
              <CardHeader>
                <CardTitle className="text-xl text-primary">
                  ประกันชั้น 2+ - คุ้มครองครบ ราคาประหยัด
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-semibold text-foreground mb-3">ความคุ้มครอง</h4>
                    <ul className="space-y-2 text-sm text-muted-foreground">
                      <li>• คุ้มครองตัวรถตามทุนประกัน</li>
                      <li>• ซ่อมศูนย์ได้</li>
                      <li>• ไม่มีค่าเสียหายส่วนแรก</li>
                      <li>• คุ้มครองรถสูญหาย ไฟไหม้</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-semibold text-foreground mb-3">เหมาะกับ</h4>
                    <ul className="space-y-2 text-sm text-muted-foreground">
                      <li>• รถอายุ 3-7 ปี</li>
                      <li>• ต้องการประหยัดเบี้ย</li>
                      <li>• ยังต้องการซ่อมศูนย์</li>
                      <li>• คุ้มครองพื้นฐานครบถ้วน</li>
                    </ul>
                  </div>
                </div>
                <div className="mt-4">
                  <Button>ดูรายละเอียดเพิ่มเติม</Button>
                </div>
              </CardContent>
            </Card>

            {/* Class 3+ */}
            <Card>
              <CardHeader>
                <CardTitle className="text-xl text-primary">
                  ประกันชั้น 3+ - ราคาประหยัด คุ้มครองพอเพียง
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-semibold text-foreground mb-3">ความคุ้มครอง</h4>
                    <ul className="space-y-2 text-sm text-muted-foreground">
                      <li>• คุ้มครองตัวรถตามทุนประกัน</li>
                      <li>• ซ่อมอู่ทั่วไป</li>
                      <li>• มีค่าเสียหายส่วนแรก</li>
                      <li>• คุ้มครองไฟไหม้</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-semibold text-foreground mb-3">เหมาะกับ</h4>
                    <ul className="space-y-2 text-sm text-muted-foreground">
                      <li>• รถอายุมาก</li>
                      <li>• งบประมาณจำกัด</li>
                      <li>• ขับระยะใกล้</li>
                      <li>• ต้องการคุ้มครองขั้นพื้นฐาน</li>
                    </ul>
                  </div>
                </div>
                <div className="mt-4">
                  <Button>ดูรายละเอียดเพิ่มเติม</Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-foreground mb-4">
              ทำไมต้องเลือกเรา?
            </h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Shield className="w-8 h-8 text-primary" />
              </div>
              <h3 className="text-lg font-semibold text-foreground mb-2">
                เปรียบเทียบครบถ้วน
              </h3>
              <p className="text-muted-foreground text-sm">
                เปรียบเทียบจาก 25+ บริษัทประกัน ในที่เดียว
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Clock className="w-8 h-8 text-primary" />
              </div>
              <h3 className="text-lg font-semibold text-foreground mb-2">
                รวดเร็วใน 3 นาที
              </h3>
              <p className="text-muted-foreground text-sm">
                เช็คราคาและเปรียบเทียบได้ทันที
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="w-8 h-8 text-primary" />
              </div>
              <h3 className="text-lg font-semibold text-foreground mb-2">
                ที่ปรึกษาผู้เชี่ยวชาญ
              </h3>
              <p className="text-muted-foreground text-sm">
                ทีมผู้เชี่ยวชาญคอยให้คำปรึกษา
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Heart className="w-8 h-8 text-primary" />
              </div>
              <h3 className="text-lg font-semibold text-foreground mb-2">
                บริการหลังการขาย
              </h3>
              <p className="text-muted-foreground text-sm">
                ดูแลคุณตลอดระยะเวลาทำประกัน
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Promotions */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-foreground mb-4">
              โปรโมชันพิเศษ
            </h2>
            <p className="text-lg text-muted-foreground">
              ข้อเสนอดีๆ ที่คุณไม่ควรพลาด
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {promotions.map((promotion) => (
              <Card key={promotion.id} className="overflow-hidden">
                <div className="relative">
                  <img
                    src={promotion.imageUrl}
                    alt={promotion.title}
                    className="w-full h-32 object-cover"
                  />
                  <Badge className="absolute top-2 right-2 bg-red-500 text-white">
                    พิเศษ
                  </Badge>
                </div>
                <CardContent className="p-4">
                  <h3 className="font-semibold text-foreground mb-2 line-clamp-2">
                    {promotion.title}
                  </h3>
                  <p className="text-sm text-muted-foreground mb-3 line-clamp-2">
                    {promotion.description}
                  </p>
                  <Button size="sm" className="w-full">
                    ดูรายละเอียด
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Knowledge Section */}
      <section className="py-16 bg-light-blue">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-foreground mb-4">
              ความรู้ประกันรถยนต์
            </h2>
            <p className="text-lg text-muted-foreground">
              บทความและคำแนะนำจากผู้เชี่ยวชาญ
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {articles.map((article) => (
              <Card key={article.id} className="overflow-hidden">
                <img
                  src={article.imageUrl}
                  alt={article.title}
                  className="w-full h-40 object-cover"
                />
                <CardContent className="p-4">
                  <div className="flex gap-2 mb-2">
                    {article.tags.slice(0, 2).map((tag) => (
                      <Badge key={tag} variant="secondary" className="text-xs">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                  <h3 className="font-semibold text-foreground mb-2 line-clamp-2">
                    {article.title}
                  </h3>
                  <p className="text-sm text-muted-foreground mb-3 line-clamp-3">
                    {article.excerpt}
                  </p>
                  <Button variant="ghost" size="sm" className="text-primary p-0">
                    อ่านเพิ่มเติม
                    <ArrowRight className="w-4 h-4 ml-1" />
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Index;