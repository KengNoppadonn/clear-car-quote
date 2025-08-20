import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ArrowRight, Shield, Clock, Users, Star, Zap, Heart, Phone, CreditCard } from "lucide-react";
import { carBrands, carModels, sampleOffers, insurers, plans, promotions, articles } from "@/data/mockData";

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
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="relative container mx-auto px-4 py-20 lg:py-32">
          <div className="max-w-4xl mx-auto text-center text-white">
            <Badge className="bg-white/20 text-white border-white/30 mb-6">
              🚀 ใหม่: เปรียบเทียบรวดเร็วขึ้น
            </Badge>
            
            <h1 className="text-4xl lg:text-6xl font-bold mb-6 leading-tight">
              เปรียบเทียบประกันรถยนต์ง่าย
              <br />
              <span className="text-white/90">เห็นราคาเร็ว ไม่ยุ่งยาก</span>
            </h1>
            
            <p className="text-xl lg:text-2xl text-white/90 mb-12 max-w-3xl mx-auto">
              เลือกยี่ห้อ/รุ่น/ปี และชั้นประกัน เพื่อดูราคาและความคุ้มครอง
              จากบริษัทประกันชั้นนำ 25+ แห่ง
            </p>

            {/* Quote Form */}
            <Card className="bg-white/95 backdrop-blur-sm shadow-2xl max-w-4xl mx-auto">
              <CardContent className="p-8">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
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
                    <div className="flex flex-wrap gap-2">
                      {["1", "2+", "3+", "2", "3"].map((cls) => (
                        <Button
                          key={cls}
                          variant={selectedClass === cls ? "default" : "outline"}
                          size="sm"
                          onClick={() => setSelectedClass(cls)}
                          className="flex-1 min-w-0"
                        >
                          {cls}
                        </Button>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row gap-4">
                  <Button 
                    size="lg" 
                    className="flex-1"
                    onClick={handleQuoteSubmit}
                    disabled={!selectedBrand || !selectedModel || !selectedYear || !selectedClass}
                  >
                    เปรียบเทียบราคา
                    <ArrowRight className="w-5 h-5 ml-2" />
                  </Button>
                  <Button 
                    variant="outline" 
                    size="lg"
                    onClick={handleContactCallback}
                  >
                    <Phone className="w-4 h-4 mr-2" />
                    ให้เราติดต่อกลับ
                  </Button>
                  <Button 
                    variant="outline" 
                    size="lg"
                    onClick={handleInstallment}
                  >
                    <CreditCard className="w-4 h-4 mr-2" />
                    ขอผ่อนชำระ
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Comparison Preview */}
      <section className="py-16 bg-surface">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-foreground mb-4">
              แผนประกันยอดนิยม
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              ตัวอย่างแผนประกันจากบริษัทชั้นนำ พร้อมราคาและความคุ้มครองที่โปร่งใส
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {previewOffers.map(({ offer, plan, insurer, model, brand }) => (
              <Card key={offer.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                <CardHeader className="pb-4">
                  <div className="flex items-center justify-between mb-2">
                    <img
                      src={insurer.logoUrl}
                      alt={insurer.name}
                      className="w-16 h-8 object-contain bg-white rounded border p-1"
                    />
                    <div className="flex items-center gap-1">
                      <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                      <span className="text-sm font-medium">{insurer.rating}</span>
                    </div>
                  </div>
                  <CardTitle className="text-lg">
                    {plan.name} - {brand.name} {model.name}
                  </CardTitle>
                  <div className="flex flex-wrap gap-2">
                    {offer.badges.map((badge) => (
                      <Badge key={badge} variant="secondary" className="text-xs">
                        {badge}
                      </Badge>
                    ))}
                  </div>
                </CardHeader>
                
                <CardContent>
                  <div className="mb-4">
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

                  <div className="grid grid-cols-3 gap-2 text-xs text-muted-foreground mb-4">
                    <div className="flex items-center gap-1">
                      <Shield className="w-3 h-3" />
                      <span>ชั้น {plan.class}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <span>{plan.repairType}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <span>ค่าเสียหาย {plan.deductible}k</span>
                    </div>
                  </div>

                  <div className="flex gap-2">
                    <Button size="sm" className="flex-1">
                      เลือกแผนนี้
                    </Button>
                    <Button variant="outline" size="sm">
                      <Heart className="w-4 h-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="text-center mt-8">
            <Button variant="outline" size="lg" asChild>
              <Link to="/compare">
                ดูแผนประกันทั้งหมด
                <ArrowRight className="w-5 h-5 ml-2" />
              </Link>
            </Button>
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

      {/* Social Proof */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-2xl font-bold text-foreground mb-4">
              เชื่อใจได้จากลูกค้ากว่า 100,000+ คน
            </h2>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-6 opacity-60">
            {insurers.map((insurer) => (
              <div key={insurer.id} className="text-center">
                <img
                  src={insurer.logoUrl}
                  alt={insurer.name}
                  className="w-16 h-8 object-contain mx-auto grayscale hover:grayscale-0 transition-all"
                />
              </div>
            ))}
          </div>

          <div className="grid md:grid-cols-3 gap-8 mt-16">
            <div className="text-center">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Shield className="w-8 h-8 text-primary" />
              </div>
              <h3 className="text-lg font-semibold text-foreground mb-2">
                ครอบคลุม 25+ บริษัท
              </h3>
              <p className="text-muted-foreground">
                เปรียบเทียบจากบริษัทประกันชั้นนำทั่วประเทศ
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Clock className="w-8 h-8 text-primary" />
              </div>
              <h3 className="text-lg font-semibold text-foreground mb-2">
                เร็วใน 3 นาที
              </h3>
              <p className="text-muted-foreground">
                เห็นราคาและเปรียบเทียบได้ทันทีโดยไม่ต้องรอ
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="w-8 h-8 text-primary" />
              </div>
              <h3 className="text-lg font-semibold text-foreground mb-2">
                บริการหลังการขาย
              </h3>
              <p className="text-muted-foreground">
                ดูแลและช่วยเหลือคุณตลอดระยะเวลาทำประกัน
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Index;