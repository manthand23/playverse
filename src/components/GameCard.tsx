
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { MapPin, Users, Trophy, Info } from 'lucide-react';
import GameDetailsModal from './GameDetailsModal';

interface Game {
  id: number;
  name: string;
  origin: string;
  equipment: string[];
  players: string;
  difficulty: string;
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

  return (
    <>
      <Card className="group hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border-2 hover:border-orange-200 bg-white h-full flex flex-col">
        <CardHeader className="pb-3 flex-shrink-0">
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <CardTitle className="text-lg font-bold text-gray-900 group-hover:text-orange-600 transition-colors leading-tight">
                {game.name}
              </CardTitle>
              <div className="mt-1">
                <span className="text-sm text-gray-600">{game.origin}</span>
              </div>
            </div>
            <Badge className={getDifficultyColor(game.difficulty)}>
              {game.difficulty}
            </Badge>
          </div>
        </CardHeader>
        
        <CardContent className="space-y-4 flex-1 flex flex-col">
          <p className="text-gray-600 text-sm line-clamp-3 flex-1">
            {game.description}
          </p>

          <div className="grid grid-cols-1 gap-3 text-sm">
            <div className="flex items-center space-x-2">
              <Users className="w-4 h-4 text-blue-500 flex-shrink-0" />
              <span className="text-gray-600">{game.players} players</span>
            </div>
            <div className="flex items-center space-x-2">
              <MapPin className="w-4 h-4 text-orange-500 flex-shrink-0" />
              <span className="text-gray-600">{game.type}</span>
            </div>
            <div className="flex items-center space-x-2">
              <Trophy className="w-4 h-4 text-purple-500 flex-shrink-0" />
              <span className="text-gray-600 truncate">{game.equipment.join(', ')}</span>
            </div>
          </div>

          <div className="pt-2 border-t mt-auto">
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
