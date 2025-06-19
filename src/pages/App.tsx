
import React, { useState } from 'react';
import { Trophy, Plus, Globe, Users, MapPin, Sparkles, Star } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useNavigate } from 'react-router-dom';
import EquipmentSelector from '@/components/EquipmentSelector';
import CreateGameModal from '@/components/CreateGameModal';
import GameCard from '@/components/GameCard';

const AppPage = () => {
  const navigate = useNavigate();
  const [selectedEquipment, setSelectedEquipment] = useState<string[]>([]);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showGames, setShowGames] = useState(false);

  // Sample sports data (replace with your actual data source)
  const sports = [
    {
      id: 1,
      name: "Kabaddi",
      origin: "India",
      equipment: ["No Equipment"],
      players: "7v7",
      difficulty: "Medium",
      type: "Outdoor",
      description: "A contact team sport that combines elements of wrestling and tag. Players take turns raiding the opposing team's half while holding their breath.",
      rules: "Two teams of seven players each occupy opposite sides of a court. Players take turns sending a 'raider' into the opposing half to tag opponents and return to their side. The raider must hold their breath and continuously chant 'kabaddi' while in enemy territory. Tagged players are eliminated unless they can tackle the raider. Points are scored for successful raids and tackles. The team with the most points after two 20-minute halves wins.",
      cultural: "Originating over 4,000 years ago in Tamil Nadu, India, Kabaddi was played to develop physical strength and defensive skills. It's deeply rooted in Indian culture and has been part of Asian Games since 1990. The sport symbolizes the eternal struggle between attack and defense, requiring both individual courage and team coordination."
    },
    {
      id: 2,
      name: "Sepak Takraw",
      origin: "Southeast Asia",
      equipment: ["Rattan Ball", "Volleyball Net"],
      players: "3v3",
      difficulty: "Hard",
      type: "Indoor/Outdoor",
      description: "A spectacular sport combining soccer, volleyball, and martial arts. Players use feet, knees, chest, and head to maneuver a rattan ball over a net.",
      rules: "Played on a badminton-sized court with a volleyball net at 1.52m height. Teams of three players (server, feeder, striker) use any part of their body except hands and arms to hit the ball. Each team gets three touches to return the ball over the net. Points are scored when the ball touches the opponent's court or they commit a fault. Games are played to 21 points, and matches are best of three sets.",
      cultural: "Dating back to the 15th century, Sepak Takraw originated in Malaysia and Thailand. It was traditionally played in royal courts and village festivals. The sport represents the Southeast Asian values of agility, creativity, and artistic expression, often compared to a graceful dance combined with athletic prowess."
    },
    {
      id: 3,
      name: "Buzkashi",
      origin: "Central Asia",
      equipment: ["Horse", "Goat Carcass"],
      players: "Variable",
      difficulty: "Hard",
      type: "Outdoor",
      description: "A rugged and intense equestrian sport where riders compete to seize and deposit a goat carcass in a designated goal.",
      rules: "Riders on horseback compete to grab a goat carcass, carry it around a flag, and deposit it in a designated goal. There are few rules, and the game can last for hours. It requires immense horsemanship, strength, and strategy. Often, alliances form between riders to control the carcass.",
      cultural: "Buzkashi has been played for centuries in Central Asia, particularly in Afghanistan, Tajikistan, and Uzbekistan. It symbolizes bravery, skill, and the bond between humans and horses. The sport is often featured in celebrations and represents the nomadic heritage of the region."
    },
    {
      id: 4,
      name: "Bocce",
      origin: "Ancient Rome",
      equipment: ["Bocce Balls", "Pallino"],
      players: "2v2 or 4v4",
      difficulty: "Easy",
      type: "Outdoor",
      description: "A relaxing and strategic lawn game where players roll bocce balls towards a smaller target ball, known as the pallino.",
      rules: "One team throws the pallino onto the court. Teams take turns rolling or tossing their bocce balls closest to the pallino. The team with the ball nearest to the pallino scores points. Games are typically played to 12 or 13 points. It's a game of precision and tactics, suitable for all ages.",
      cultural: "Bocce dates back to the Roman Empire and has been enjoyed throughout Italy for centuries. It represents social connection, friendly competition, and the simple pleasures of life. The game is often played in parks and public spaces, bringing communities together."
    },
    {
      id: 5,
      name: "Jai Alai",
      origin: "Basque Country",
      equipment: ["Cesta", "Pelota"],
      players: "1v1 or 2v2",
      difficulty: "Hard",
      type: "Indoor",
      description: "A fast-paced and thrilling sport where players use a curved, elongated basket (cesta) to hurl a hard ball (pelota) against a wall.",
      rules: "Players use the cesta to catch and throw the pelota against a front wall. The ball must be played in one continuous motion. Points are scored when the opposing player fails to catch the ball or makes an error. Games are played to a set number of points. It's known as the world's fastest ball game.",
      cultural: "Jai Alai originated in the Basque Country of Spain and France. It represents the region's unique cultural identity, athleticism, and passion. The sport has spread to other parts of the world, but remains deeply connected to its Basque roots."
    }
  ];

  const handleFindGames = () => {
    if (selectedEquipment.length === 0) {
      return;
    }
    setShowGames(true);
  };

  const getFilteredSports = () => {
    if (selectedEquipment.length === 0) return [];
    
    return sports.filter(sport => {
      if (selectedEquipment.includes("No Equipment")) {
        return sport.equipment.includes("No Equipment");
      }
      
      return sport.equipment.some(equipment => 
        selectedEquipment.includes(equipment)
      );
    });
  };

  const filteredSports = getFilteredSports();

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50">
      {/* Header */}
      <header className="bg-white border-b border-purple-200 sticky top-0 z-40">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-r from-orange-500 to-red-500 rounded-full flex items-center justify-center">
                <Globe className="w-5 h-5 text-white" />
              </div>
              <h1 className="text-xl md:text-2xl font-bold bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent">
                Playverse
              </h1>
            </div>
            <div className="flex items-center space-x-2">
              <Button 
                variant="outline"
                size="sm"
                onClick={() => navigate('/my-games')}
                className="border-orange-200 hover:bg-orange-50"
              >
                <Trophy className="w-4 h-4 mr-1" />
                <span className="hidden sm:inline">My Games</span>
              </Button>
              <Button 
                onClick={() => setShowCreateModal(true)}
                size="sm"
                className="bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600"
              >
                <Plus className="w-4 h-4 mr-1" />
                <span className="hidden sm:inline">Create</span>
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-6 space-y-8">
        {/* Equipment Selection */}
        <Card className="border-2 border-orange-200 bg-white/80 backdrop-blur-sm">
          <CardHeader className="text-center pb-4">
            <CardTitle className="text-2xl md:text-3xl font-bold text-gray-900 flex items-center justify-center space-x-2">
              <Sparkles className="w-7 h-7 text-yellow-500" />
              <span>Find Your Perfect Sport/Game</span>
            </CardTitle>
            <p className="text-base md:text-lg text-gray-600 mt-2">
              Ready to discover new sports/games?<br />
              Select your available equipment above and click "Find Sports/Games" to get personalized recommendations
            </p>
          </CardHeader>
          <CardContent className="space-y-6">
            <EquipmentSelector 
              onEquipmentChange={setSelectedEquipment}
              selectedEquipment={selectedEquipment}
            />
            
            <div className="text-center pt-4">
              <Button 
                onClick={handleFindGames}
                disabled={selectedEquipment.length === 0}
                className="bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white font-semibold py-3 px-8 text-lg"
              >
                <Star className="w-5 h-5 mr-2" />
                Find Sports/Games
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Results */}
        {showGames && (
          <div className="space-y-6">
            {filteredSports.length > 0 ? (
              <>
                <div className="text-center space-y-2">
                  <h2 className="text-2xl md:text-3xl font-bold text-gray-900">
                    Matches Found!
                  </h2>
                  <p className="text-base md:text-lg text-gray-600">
                    {filteredSports.length} sport/game{filteredSports.length !== 1 ? 's' : ''} you can play with your equipment
                  </p>
                </div>

                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2">
                  {filteredSports.map((sport) => (
                    <GameCard key={sport.id} game={sport} />
                  ))}
                </div>
              </>
            ) : (
              <Card className="text-center py-12 bg-gradient-to-br from-gray-50 to-gray-100 max-w-md mx-auto">
                <CardContent className="space-y-4">
                  <div className="w-16 h-16 bg-gradient-to-r from-orange-400 to-red-400 rounded-full flex items-center justify-center mx-auto">
                    <Globe className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900">
                    No matches found
                  </h3>
                  <p className="text-gray-600 mb-4">
                    Try selecting different equipment or create your own sport/game!
                  </p>
                  <Button 
                    onClick={() => setShowCreateModal(true)}
                    className="bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600"
                  >
                    <Plus className="w-4 h-4 mr-2" />
                    Create Custom Game
                  </Button>
                </CardContent>
              </Card>
            )}
          </div>
        )}
      </div>

      <CreateGameModal 
        isOpen={showCreateModal}
        onClose={() => setShowCreateModal(false)}
      />
    </div>
  );
};

export default AppPage;
