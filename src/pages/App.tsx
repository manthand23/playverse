
import React, { useState } from 'react';
import { Search, Plus, Globe, Users, Trophy, MapPin, ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import EquipmentSelector from '@/components/EquipmentSelector';
import GameCard from '@/components/GameCard';
import CreateGameModal from '@/components/CreateGameModal';
import { useNavigate } from 'react-router-dom';

const AppPage = () => {
  const navigate = useNavigate();
  const [selectedEquipment, setSelectedEquipment] = useState<string[]>([]);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [recommendations, setRecommendations] = useState<any[]>([]);

  const handleEquipmentChange = (equipment: string[]) => {
    setSelectedEquipment(equipment);
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
        type: "Outdoor",
        description: "Ancient contact sport combining strength, strategy, and breath control where raiders must tag opponents and return safely",
        rules: "SETUP: Create two halves of a court (13x10 meters each). Divide players into two teams of 7.\n\nGAMEPLAY:\n1. Teams alternate sending a 'raider' to the opponent's half\n2. The raider must chant 'kabaddi-kabaddi' continuously in one breath\n3. Raider tries to tag as many defenders as possible\n4. Tagged defenders are 'out' if the raider returns safely to their half\n5. If defenders tackle the raider before they return, the raider is out\n6. Game consists of two 20-minute halves\n7. Team with most points wins",
        cultural: "Dating back over 4,000 years to ancient India, Kabaddi represents the warrior spirit and tactical prowess valued in Indian culture. Originally practiced by soldiers to develop combat skills, it became the national sport of Bangladesh and is deeply rooted in South Asian tradition. The word 'kabaddi' comes from the Tamil word 'kai-pidi' meaning 'holding hands.' Today it's played professionally across Asia and represents the perfect blend of individual skill and team strategy that defines many traditional Indian sports."
      },
      {
        id: 2,
        name: "Sepak Takraw",
        origin: "Thailand/Malaysia",
        equipment: ["Ball"],
        players: "3v3",
        difficulty: "Hard",
        type: "Outdoor",
        description: "Spectacular acrobatic sport combining soccer and volleyball using feet, knees, chest, and head to keep a rattan ball airborne",
        rules: "SETUP: Court is 13.4x6.1 meters with a 1.52m high net. Use a rattan or synthetic ball.\n\nGAMEPLAY:\n1. Teams of 3 players each (spiker, feeder, server)\n2. Serve the ball over the net using feet only\n3. Maximum 3 touches per side before sending over net\n4. No hands or arms allowed - use feet, knees, chest, head\n5. Players can use any part of body except hands/arms\n6. Points scored when ball hits opponent's court or they fault\n7. Games played to 21 points (must win by 2)\n8. Best of 3 sets wins the match",
        cultural: "Known as the 'kick volleyball,' Sepak Takraw originated 500 years ago in the royal courts of Malaysia and Thailand. The sport showcases the incredible athletic artistry and flexibility valued in Southeast Asian martial arts traditions. 'Sepak' means 'kick' in Malay, while 'takraw' means 'ball' in Thai. Originally played in a circle for fun, it evolved into the competitive net sport we see today. The game represents the harmony between grace and power that is central to Southeast Asian physical culture, and watching players perform bicycle kicks and aerial maneuvers is truly mesmerizing."
      },
      {
        id: 3,
        name: "Cone Soccer",
        origin: "Modern Adaptation",
        equipment: ["Soccer Ball", "Cones"],
        players: "2-8",
        difficulty: "Easy",
        type: "Outdoor",
        description: "Fast-paced defensive game where players protect their cone goals while attacking others in a chaotic free-for-all",
        rules: "SETUP: Place one cone per player in a large circle (20-30 meters diameter). Each player starts next to their cone.\n\nGAMEPLAY:\n1. Use one soccer ball for all players\n2. Each player defends their own cone while trying to knock over others'\n3. Players can only use feet to move the ball\n4. When your cone is knocked over, you're temporarily out\n5. Last player with cone standing wins the round\n6. Knocked-out players can return after 30 seconds\n7. Play multiple rounds, first to 3 wins overall\n8. No goalkeeping - must stay mobile and attack/defend dynamically",
        cultural: "A brilliant modern adaptation of traditional soccer that emphasizes the sport's core values of quick thinking, spatial awareness, and ball control. This game strips away complex rules to focus on pure soccer fundamentals while adding a strategic twist. It represents the evolution of street soccer and playground games, where creativity and adaptability matter more than formal structure. Popular in youth soccer programs worldwide, it teaches players to think 360 degrees and develops the kind of situational awareness that makes great soccer players."
      },
      {
        id: 4,
        name: "Jump Rope Boxing",
        origin: "Training Evolution",
        equipment: ["Skipping Rope"],
        players: "2-6",
        difficulty: "Medium",
        type: "Indoor/Outdoor",
        description: "High-intensity cardio game combining jump rope skills with defensive strategy and rhythm coordination",
        rules: "SETUP: Each player needs a jump rope. Create a circle 5 meters in diameter.\n\nGAMEPLAY:\n1. All players start jumping rope simultaneously in the circle\n2. While jumping, players try to tangle or step on opponents' ropes\n3. Must maintain your own jumping rhythm throughout\n4. If your rope stops or you stop jumping, you're out for 30 seconds\n5. If you successfully tangle someone's rope, they sit out\n6. Last person jumping wins the round\n7. Play best of 5 rounds\n8. Advanced rule: Add footwork patterns or specific jumping styles",
        cultural: "Evolved from traditional boxing training routines, this game emphasizes the rhythm, coordination, and mental focus that are central to combat sports training. Jump rope has been used by fighters for over a century to develop footwork, timing, and cardiovascular endurance. This playful adaptation maintains those training benefits while adding competitive elements that make it accessible to everyone. It represents how traditional athletic training methods can be transformed into engaging games that preserve the physical and mental benefits of the original practice."
      },
      {
        id: 5,
        name: "Netball Knockout",
        origin: "Commonwealth Nations",
        equipment: ["Basketball Hoop", "Ball"],
        players: "4-10",
        difficulty: "Medium",
        type: "Outdoor",
        description: "Fast-paced shooting game combining netball accuracy with elimination-style competition",
        rules: "SETUP: Use basketball hoop or netball post. Players form line behind shooting mark (3 meters from hoop).\n\nGAMEPLAY:\n1. First player shoots, if they score they go to back of line\n2. If they miss, they become 'runner' and must retrieve ball\n3. While runner gets ball, next player shoots immediately\n4. If next player scores before runner returns ball to line, runner is out\n5. If runner returns ball before next shot is made, they rejoin line\n6. Continue until only 2 players remain\n7. Final two players take alternating shots until one misses\n8. Winner stays on for next round",
        cultural: "Netball was invented in 1891 and became hugely popular across the British Commonwealth, particularly among women. This knockout variation captures the precision and quick decision-making that made netball a cornerstone sport in countries like Australia, New Zealand, and the UK. The game emphasizes the shooting accuracy and spatial awareness that are fundamental to netball while adding the excitement of elimination gameplay. It represents how traditional Commonwealth sports can be adapted to create inclusive, competitive games for mixed groups."
      }
    ];

    const filtered = allGames.filter(game => {
      if (equipment.length === 0) return true;
      return equipment.some(equip => 
        game.equipment.includes(equip) || game.equipment.includes("None")
      );
    });

    setRecommendations(filtered);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50">
      {/* Header */}
      <header className="bg-white/90 backdrop-blur-md border-b border-purple-200/50 sticky top-0 z-40">
        <div className="container mx-auto px-4 py-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Button 
                variant="ghost" 
                size="sm"
                onClick={() => navigate('/')}
                className="md:hidden"
              >
                <ArrowLeft className="w-4 h-4" />
              </Button>
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-gradient-to-r from-orange-500 to-red-500 rounded-full flex items-center justify-center">
                  <Trophy className="w-5 h-5 text-white" />
                </div>
                <h1 className="text-xl md:text-2xl font-bold bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent">
                  Playverse
                </h1>
              </div>
            </div>
            <Button 
              onClick={() => setIsCreateModalOpen(true)}
              size="sm"
              className="bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600"
            >
              <Plus className="w-4 h-4 mr-1" />
              <span className="hidden sm:inline">Create Game</span>
            </Button>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-6 space-y-6">
        {/* Hero Section */}
        <div className="text-center space-y-3">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
            Discover Sports From Around The World
          </h2>
          <p className="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto">
            Tell us what equipment you have, and we'll recommend amazing games from every corner of the globe
          </p>
        </div>

        {/* Equipment Selector */}
        <Card className="border-2 border-orange-200 shadow-lg bg-white/80 backdrop-blur-sm">
          <CardHeader className="pb-4">
            <CardTitle className="flex items-center space-x-2 text-lg md:text-xl">
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
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
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
            <h3 className="text-xl md:text-2xl font-bold text-gray-900 flex items-center space-x-2">
              <Globe className="w-6 h-6 text-blue-600" />
              <span>Recommended Games</span>
            </h3>
            <div className="grid gap-4 md:gap-6 sm:grid-cols-2 lg:grid-cols-3">
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

export default AppPage;
