
import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { MapPin, Users, Trophy, Globe, BookOpen, Play } from 'lucide-react';

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

interface GameDetailsModalProps {
  game: Game;
  isOpen: boolean;
  onClose: () => void;
}

const GameDetailsModal: React.FC<GameDetailsModalProps> = ({ game, isOpen, onClose }) => {
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
      'Training Evolution': '🥊',
      'Commonwealth Nations': '🇬🇧'
    };
    return flags[origin] || '🌍';
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent">
            {game.name}
          </DialogTitle>
          <div className="flex items-center space-x-2 mt-2">
            <span className="text-2xl">{getOriginFlag(game.origin)}</span>
            <span className="text-lg text-gray-600">{game.origin}</span>
            <Badge className={getDifficultyColor(game.difficulty)}>
              {game.difficulty}
            </Badge>
          </div>
        </DialogHeader>

        <div className="space-y-6">
          {/* Quick Stats */}
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            <div className="text-center p-3 bg-blue-50 rounded-lg">
              <Users className="w-6 h-6 text-blue-500 mx-auto mb-1" />
              <div className="text-sm font-medium text-blue-900">Players</div>
              <div className="text-sm text-blue-700">{game.players}</div>
            </div>
            <div className="text-center p-3 bg-orange-50 rounded-lg">
              <MapPin className="w-6 h-6 text-orange-500 mx-auto mb-1" />
              <div className="text-sm font-medium text-orange-900">Type</div>
              <div className="text-sm text-orange-700">{game.type}</div>
            </div>
            <div className="text-center p-3 bg-purple-50 rounded-lg">
              <Trophy className="w-6 h-6 text-purple-500 mx-auto mb-1" />
              <div className="text-sm font-medium text-purple-900">Equipment</div>
              <div className="text-sm text-purple-700">{game.equipment.join(', ')}</div>
            </div>
          </div>

          {/* Description */}
          <div className="space-y-3">
            <h3 className="text-lg font-semibold text-gray-900 flex items-center space-x-2">
              <Play className="w-5 h-5 text-orange-500" />
              <span>About This Game</span>
            </h3>
            <p className="text-gray-700 leading-relaxed">{game.description}</p>
          </div>

          {/* Rules */}
          <div className="space-y-3">
            <h3 className="text-lg font-semibold text-gray-900 flex items-center space-x-2">
              <BookOpen className="w-5 h-5 text-blue-500" />
              <span>How to Play</span>
            </h3>
            <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
              <div className="text-blue-900 whitespace-pre-line leading-relaxed">{game.rules}</div>
            </div>
          </div>

          {/* Cultural Background */}
          <div className="space-y-3">
            <h3 className="text-lg font-semibold text-gray-900 flex items-center space-x-2">
              <Globe className="w-5 h-5 text-green-500" />
              <span>Cultural Background</span>
            </h3>
            <div className="bg-green-50 p-4 rounded-lg border border-green-200">
              <p className="text-green-900 leading-relaxed">{game.cultural}</p>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3 pt-4 border-t">
            <Button 
              className="flex-1 bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600"
            >
              <Play className="w-4 h-4 mr-2" />
              Start Playing
            </Button>
            <Button 
              variant="outline" 
              className="flex-1 border-orange-200 hover:bg-orange-50"
            >
              Share Game
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default GameDetailsModal;
