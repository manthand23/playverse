
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Plus, X, Lightbulb, Users, Clock, MapPin } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface CreateGameModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const CreateGameModal: React.FC<CreateGameModalProps> = ({ isOpen, onClose }) => {
  const { toast } = useToast();
  const [gameName, setGameName] = useState('');
  const [description, setDescription] = useState('');
  const [rules, setRules] = useState('');
  const [players, setPlayers] = useState('');
  const [duration, setDuration] = useState('');
  const [gameType, setGameType] = useState('');
  const [difficulty, setDifficulty] = useState('');
  const [selectedEquipment, setSelectedEquipment] = useState<string[]>([]);

  const equipmentOptions = [
    'Soccer Ball', 'Basketball', 'Ball', 'Cones', 'Skipping Rope', 
    'Frisbee', 'Bat', 'Racket', 'None'
  ];

  const toggleEquipment = (equipment: string) => {
    setSelectedEquipment(prev => 
      prev.includes(equipment) 
        ? prev.filter(item => item !== equipment)
        : [...prev, equipment]
    );
  };

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

    // Simulate game creation
    toast({
      title: "Game Created! 🎉",
      description: `${gameName} has been added to the community library`,
    });

    // Reset form
    setGameName('');
    setDescription('');
    setRules('');
    setPlayers('');
    setDuration('');
    setGameType('');
    setDifficulty('');
    setSelectedEquipment([]);
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent flex items-center space-x-2">
            <Lightbulb className="w-6 h-6 text-yellow-500" />
            <span>Create Your Own Game</span>
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Game Name */}
          <div className="space-y-2">
            <Label htmlFor="gameName" className="text-sm font-medium">
              Game Name *
            </Label>
            <Input
              id="gameName"
              value={gameName}
              onChange={(e) => setGameName(e.target.value)}
              placeholder="Enter your game's name"
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
              placeholder="Describe your game in an exciting way"
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
              placeholder="Explain how to play your game step by step"
              className="border-orange-200 focus:border-orange-400 min-h-[100px]"
            />
          </div>

          {/* Game Details Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
                <Clock className="w-4 h-4 text-green-500" />
                <span>Duration</span>
              </Label>
              <Input
                value={duration}
                onChange={(e) => setDuration(e.target.value)}
                placeholder="e.g., 15 min, 30 min"
                className="border-orange-200 focus:border-orange-400"
              />
            </div>

            <div className="space-y-2">
              <Label className="text-sm font-medium flex items-center space-x-1">
                <MapPin className="w-4 h-4 text-orange-500" />
                <span>Game Type</span>
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
            <div className="flex flex-wrap gap-2">
              {equipmentOptions.map(equipment => (
                <Button
                  key={equipment}
                  type="button"
                  variant={selectedEquipment.includes(equipment) ? "default" : "outline"}
                  size="sm"
                  onClick={() => toggleEquipment(equipment)}
                  className={`transition-all duration-200 ${
                    selectedEquipment.includes(equipment)
                      ? 'bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600 text-white border-0'
                      : 'hover:border-green-300 hover:bg-green-50'
                  }`}
                >
                  {equipment}
                </Button>
              ))}
            </div>
            {selectedEquipment.length > 0 && (
              <div className="flex flex-wrap gap-2 mt-2">
                {selectedEquipment.map(item => (
                  <Badge 
                    key={item} 
                    variant="secondary"
                    className="bg-gradient-to-r from-green-100 to-blue-100 text-green-800 border border-green-200"
                  >
                    {item}
                    <button
                      type="button"
                      onClick={() => toggleEquipment(item)}
                      className="ml-2 hover:text-red-600"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </Badge>
                ))}
              </div>
            )}
          </div>

          {/* Submit Button */}
          <div className="flex gap-3 pt-4 border-t">
            <Button 
              type="submit"
              className="flex-1 bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600"
            >
              <Plus className="w-4 h-4 mr-2" />
              Create Game
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
