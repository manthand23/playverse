
import React, { useState } from 'react';
import { Search, Plus, Globe, Users, Clock, Trophy, MapPin } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import EquipmentSelector from '@/components/EquipmentSelector';
import GameCard from '@/components/GameCard';
import CreateGameModal from '@/components/CreateGameModal';

const Index = () => {
  const [selectedEquipment, setSelectedEquipment] = useState<string[]>([]);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [recommendations, setRecommendations] = useState<any[]>([]);

  const handleEquipmentChange = (equipment: string[]) => {
    setSelectedEquipment(equipment);
    // Simulate AI recommendations based on equipment
    generateRecommendations(equipment);
  };

  const generateRecommendations = (equipment: string[]) => {
    const allGames = [
      {
        id: 1,
        name: "Kabaddi",
        origin: "India",
        equipment: ["None"],
        players: "7v7",
        difficulty: "Medium",
        duration: "40 min",
        type: "Outdoor",
        description: "Ancient contact sport combining strength, strategy, and breath control",
        rules: "Players take turns raiding the opponent's half while holding their breath, trying to tag players and return safely.",
        cultural: "Dating back 4,000 years, Kabaddi represents the warrior spirit of ancient India and is now the national sport."
      },
      {
        id: 2,
        name: "Sepak Takraw",
        origin: "Thailand/Malaysia",
        equipment: ["Ball"],
        players: "3v3",
        difficulty: "Hard",
        duration: "30 min",
        type: "Outdoor",
        description: "Acrobatic sport combining soccer and volleyball using feet, knees, chest, and head",
        rules: "Players use everything except hands to keep the rattan ball airborne and send it over the net.",
        cultural: "Known as the 'kick volleyball,' this 500-year-old sport showcases Southeast Asian athletic artistry."
      },
      {
        id: 3,
        name: "Cone Soccer",
        origin: "Modern Adaptation",
        equipment: ["Soccer Ball", "Cones"],
        players: "2-8",
        difficulty: "Easy",
        duration: "20 min",
        type: "Outdoor",
        description: "Dynamic game where players protect cone goals while attacking others",
        rules: "Each player guards a cone while trying to knock over opponents' cones with the ball.",
        cultural: "A modern twist on traditional soccer, perfect for developing ball control and spatial awareness."
      },
      {
        id: 4,
        name: "Jump Rope Boxing",
        origin: "Training Evolution",
        equipment: ["Skipping Rope"],
        players: "2-6",
        difficulty: "Medium",
        duration: "15 min",
        type: "Indoor/Outdoor",
        description: "Cardio-intensive game combining jump rope skills with defensive strategy",
        rules: "Players jump rope while trying to tangle opponents' ropes without stopping their own rhythm.",
        cultural: "Evolved from boxing training routines, emphasizing rhythm, coordination, and mental focus."
      }
    ];

    // Filter games based on selected equipment
    const filtered = allGames.filter(game => {
      if (equipment.length === 0) return true;
      return equipment.some(equip => 
        game.equipment.includes(equip) || game.equipment.includes("None")
      );
    });

    setRecommendations(filtered);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-orange-50 to-green-50">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-md border-b sticky top-0 z-40">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-r from-orange-500 to-red-500 rounded-full flex items-center justify-center">
                <Trophy className="w-5 h-5 text-white" />
              </div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent">
                SportFinder
              </h1>
            </div>
            <Button 
              onClick={() => setIsCreateModalOpen(true)}
              className="bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600"
            >
              <Plus className="w-4 h-4 mr-2" />
              Create Game
            </Button>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-6 space-y-8">
        {/* Hero Section */}
        <div className="text-center space-y-4">
          <h2 className="text-4xl font-bold text-gray-900 mb-2">
            Discover Sports From Around The World
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Tell us what equipment you have, and we'll recommend amazing games from every corner of the globe
          </p>
        </div>

        {/* Equipment Selector */}
        <Card className="border-2 border-orange-200 shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Search className="w-5 h-5 text-orange-600" />
              <span>What equipment do you have?</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <EquipmentSelector 
              onEquipmentChange={handleEquipmentChange}
              selectedEquipment={selectedEquipment}
            />
          </CardContent>
        </Card>

        {/* Quick Stats */}
        {selectedEquipment.length > 0 && (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Card className="text-center p-4 bg-gradient-to-br from-blue-500 to-blue-600 text-white">
              <div className="text-2xl font-bold">{recommendations.length}</div>
              <div className="text-sm opacity-90">Games Found</div>
            </Card>
            <Card className="text-center p-4 bg-gradient-to-br from-green-500 to-green-600 text-white">
              <div className="text-2xl font-bold">{new Set(recommendations.map(g => g.origin)).size}</div>
              <div className="text-sm opacity-90">Countries</div>
            </Card>
            <Card className="text-center p-4 bg-gradient-to-br from-orange-500 to-orange-600 text-white">
              <div className="text-2xl font-bold">{recommendations.filter(g => g.difficulty === "Easy").length}</div>
              <div className="text-sm opacity-90">Easy Games</div>
            </Card>
            <Card className="text-center p-4 bg-gradient-to-br from-purple-500 to-purple-600 text-white">
              <div className="text-2xl font-bold">{recommendations.filter(g => g.type === "Outdoor").length}</div>
              <div className="text-sm opacity-90">Outdoor</div>
            </Card>
          </div>
        )}

        {/* Game Recommendations */}
        {recommendations.length > 0 && (
          <div className="space-y-4">
            <h3 className="text-2xl font-bold text-gray-900 flex items-center space-x-2">
              <Globe className="w-6 h-6 text-blue-600" />
              <span>Recommended Games</span>
            </h3>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {recommendations.map((game) => (
                <GameCard key={game.id} game={game} />
              ))}
            </div>
          </div>
        )}

        {/* Empty State */}
        {selectedEquipment.length === 0 && (
          <Card className="text-center py-12 bg-gradient-to-br from-gray-50 to-gray-100">
            <CardContent className="space-y-4">
              <div className="w-16 h-16 bg-gradient-to-r from-orange-400 to-red-400 rounded-full flex items-center justify-center mx-auto">
                <Search className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900">
                Ready to discover new sports?
              </h3>
              <p className="text-gray-600">
                Select your available equipment above to get personalized game recommendations
              </p>
            </CardContent>
          </Card>
        )}
      </div>

      <CreateGameModal 
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
      />
    </div>
  );
};

export default Index;
