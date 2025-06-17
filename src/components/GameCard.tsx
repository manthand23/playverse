
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { MapPin, Users, Clock, Trophy, Info, Globe } from 'lucide-react';
import GameDetailsModal from './GameDetailsModal';

interface Game {
  id: number;
  name: string;
  origin: string;
  equipment: string[];
  players: string;
  difficulty: string;
  duration: string;
  type: string;
  description: string;
  rules: string;
  cultural: string;
}

interface GameCardProps {
  game: Game;
}

const GameCard: React.FC<GameCardProps> = ({ game }) => {
  const [showDetails, setShowDetails] = useState(false);

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Easy': return 'bg-green-100 text-green-800 border-green-200';
      case 'Medium': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'Hard': return 'bg-red-100 text-red-800 border-red-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getOriginFlag = (origin: string) => {
    const flags: { [key: string]: string } = {
      'India': '🇮🇳',
      'Thailand/Malaysia': '🇹🇭',
      'Modern Adaptation': '🌍',
      'Training Evolution': '🥊'
    };
    return flags[origin] || '🌍';
  };

  return (
    <>
      <Card className="group hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border-2 hover:border-orange-200 bg-white/80 backdrop-blur-sm">
        <CardHeader className="pb-3">
          <div className="flex items-start justify-between">
            <div>
              <CardTitle className="text-lg font-bold text-gray-900 group-hover:text-orange-600 transition-colors">
                {game.name}
              </CardTitle>
              <div className="flex items-center space-x-1 mt-1">
                <span>{getOriginFlag(game.origin)}</span>
                <span className="text-sm text-gray-600">{game.origin}</span>
              </div>
            </div>
            <Badge className={getDifficultyColor(game.difficulty)}>
              {game.difficulty}
            </Badge>
          </div>
        </CardHeader>
        
        <CardContent className="space-y-4">
          <p className="text-gray-600 text-sm line-clamp-2">
            {game.description}
          </p>

          <div className="grid grid-cols-2 gap-3 text-sm">
            <div className="flex items-center space-x-2">
              <Users className="w-4 h-4 text-blue-500" />
              <span className="text-gray-600">{game.players}</span>
            </div>
            <div className="flex items-center space-x-2">
              <Clock className="w-4 h-4 text-green-500" />
              <span className="text-gray-600">{game.duration}</span>
            </div>
            <div className="flex items-center space-x-2">
              <MapPin className="w-4 h-4 text-orange-500" />
              <span className="text-gray-600">{game.type}</span>
            </div>
            <div className="flex items-center space-x-2">
              <Trophy className="w-4 h-4 text-purple-500" />
              <span className="text-gray-600">{game.equipment.join(', ')}</span>
            </div>
          </div>

          <div className="pt-2 border-t">
            <Button 
              onClick={() => setShowDetails(true)}
              className="w-full bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600"
            >
              <Info className="w-4 h-4 mr-2" />
              Learn & Play
            </Button>
          </div>
        </CardContent>
      </Card>

      <GameDetailsModal 
        game={game}
        isOpen={showDetails}
        onClose={() => setShowDetails(false)}
      />
    </>
  );
};

export default GameCard;
