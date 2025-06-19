
import React, { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Plus, Lightbulb, Users, MapPin } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { useNavigate } from 'react-router-dom';
import EquipmentSelector from './EquipmentSelector';

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

interface CreateGameModalProps {
  isOpen: boolean;
  onClose: () => void;
  editGame?: Game | null;
}

const CreateGameModal: React.FC<CreateGameModalProps> = ({ isOpen, onClose, editGame }) => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const [gameName, setGameName] = useState('');
  const [description, setDescription] = useState('');
  const [rules, setRules] = useState('');
  const [players, setPlayers] = useState('');
  const [gameType, setGameType] = useState('');
  const [difficulty, setDifficulty] = useState('');
  const [selectedEquipment, setSelectedEquipment] = useState<string[]>([]);

  // Populate form when editing
  useEffect(() => {
    if (editGame) {
      setGameName(editGame.name);
      setDescription(editGame.description);
      setRules(editGame.rules);
      setPlayers(editGame.players);
      setGameType(editGame.type);
      setDifficulty(editGame.difficulty);
      setSelectedEquipment(editGame.equipment);
    } else {
      // Reset form for new game
      setGameName('');
      setDescription('');
      setRules('');
      setPlayers('');
      setGameType('');
      setDifficulty('');
      setSelectedEquipment([]);
    }
  }, [editGame, isOpen]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!gameName || !description || !rules) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields",
        variant: "destructive"
      });
      return;
    }

    const gameData = {
      id: editGame ? editGame.id : Date.now(),
      name: gameName,
      origin: "Custom Game",
      equipment: selectedEquipment.length > 0 ? selectedEquipment : ["None"],
      players: players || "Variable",
      difficulty: difficulty || "Medium",
      type: gameType || "Indoor/Outdoor",
      description: description,
      rules: rules,
      cultural: editGame 
        ? editGame.cultural 
        : `This is a custom sport/game created by you! Share it with friends and family to spread the fun. Created on ${new Date().toLocaleDateString()}.`
    };

    const existingGames = JSON.parse(localStorage.getItem('myGames') || '[]');
    
    if (editGame) {
      // Update existing game
      const updatedGames = existingGames.map((game: Game) => 
        game.id === editGame.id ? gameData : game
      );
      localStorage.setItem('myGames', JSON.stringify(updatedGames));
      
      toast({
        title: "Sport/Game Updated!",
        description: `${gameName} has been updated successfully`,
      });
    } else {
      // Create new game
      const updatedGames = [...existingGames, gameData];
      localStorage.setItem('myGames', JSON.stringify(updatedGames));
      
      toast({
        title: "Sport/Game Created!",
        description: `${gameName} has been added to your games`,
      });
    }

    // Reset form
    setGameName('');
    setDescription('');
    setRules('');
    setPlayers('');
    setGameType('');
    setDifficulty('');
    setSelectedEquipment([]);
    onClose();

    // Navigate to My Games page
    navigate('/my-games');
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent flex items-center space-x-2">
            <Lightbulb className="w-6 h-6 text-yellow-500" />
            <span>{editGame ? 'Edit Your Sport/Game' : 'Create Your Own Sport/Game'}</span>
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Game Name */}
          <div className="space-y-2">
            <Label htmlFor="gameName" className="text-sm font-medium">
              Sport/Game Name *
            </Label>
            <Input
              id="gameName"
              value={gameName}
              onChange={(e) => setGameName(e.target.value)}
              placeholder="Enter your sport/game's name"
              className="border-orange-200 focus:border-orange-400"
            />
          </div>

          {/* Description */}
          <div className="space-y-2">
            <Label htmlFor="description" className="text-sm font-medium">
              Description *
            </Label>
            <Textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Describe your sport/game in an exciting way"
              className="border-orange-200 focus:border-orange-400 min-h-[80px]"
            />
          </div>

          {/* Rules */}
          <div className="space-y-2">
            <Label htmlFor="rules" className="text-sm font-medium">
              Rules & How to Play *
            </Label>
            <Textarea
              id="rules"
              value={rules}
              onChange={(e) => setRules(e.target.value)}
              placeholder="Explain how to play your sport/game step by step"
              className="border-orange-200 focus:border-orange-400 min-h-[100px]"
            />
          </div>

          {/* Game Details Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label className="text-sm font-medium flex items-center space-x-1">
                <Users className="w-4 h-4 text-blue-500" />
                <span>Number of Players</span>
              </Label>
              <Input
                value={players}
                onChange={(e) => setPlayers(e.target.value)}
                placeholder="e.g., 2-6, 4v4"
                className="border-orange-200 focus:border-orange-400"
              />
            </div>

            <div className="space-y-2">
              <Label className="text-sm font-medium flex items-center space-x-1">
                <MapPin className="w-4 h-4 text-orange-500" />
                <span>Type</span>
              </Label>
              <Select value={gameType} onValueChange={setGameType}>
                <SelectTrigger className="border-orange-200 focus:border-orange-400">
                  <SelectValue placeholder="Select type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Indoor">Indoor</SelectItem>
                  <SelectItem value="Outdoor">Outdoor</SelectItem>
                  <SelectItem value="Indoor/Outdoor">Indoor/Outdoor</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label className="text-sm font-medium">Difficulty</Label>
              <Select value={difficulty} onValueChange={setDifficulty}>
                <SelectTrigger className="border-orange-200 focus:border-orange-400">
                  <SelectValue placeholder="Select difficulty" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Easy">Easy</SelectItem>
                  <SelectItem value="Medium">Medium</SelectItem>
                  <SelectItem value="Hard">Hard</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Equipment Selection */}
          <div className="space-y-3">
            <Label className="text-sm font-medium">Required Equipment</Label>
            <EquipmentSelector 
              onEquipmentChange={setSelectedEquipment}
              selectedEquipment={selectedEquipment}
            />
          </div>

          {/* Submit Button */}
          <div className="flex gap-3 pt-4 border-t">
            <Button 
              type="submit"
              className="flex-1 bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600"
            >
              <Plus className="w-4 h-4 mr-2" />
              {editGame ? 'Update Sport/Game' : 'Create Sport/Game'}
            </Button>
            <Button 
              type="button"
              variant="outline" 
              onClick={onClose}
              className="border-gray-300 hover:bg-gray-50"
            >
              Cancel
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default CreateGameModal;
