import React, { useState } from 'react';
import { ArrowLeft, Plus, Trophy, Search, EllipsisVertical, Edit, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { useNavigate } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';
import GameCard from '@/components/GameCard';
import CreateGameModal from '@/components/CreateGameModal';

const MyGames = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [editingGame, setEditingGame] = useState(null);
  
  // Get games from localStorage (this is where created games will be stored)
  const getMyGames = () => {
    const stored = localStorage.getItem('myGames');
    return stored ? JSON.parse(stored) : [];
  };

  const deleteGame = (gameId: number) => {
    const existingGames = getMyGames();
    const updatedGames = existingGames.filter((game: any) => game.id !== gameId);
    localStorage.setItem('myGames', JSON.stringify(updatedGames));
    
    toast({
      title: "Game Deleted",
      description: "The sport/game has been removed from your collection",
    });
    
    // Force re-render by navigating to same route
    window.location.reload();
  };

  const editGame = (game: any) => {
    setEditingGame(game);
    setShowCreateModal(true);
  };

  const handleCloseModal = () => {
    setShowCreateModal(false);
    setEditingGame(null);
  };

  const myGames = getMyGames();

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50">
      {/* Header */}
      <header className="bg-white border-b border-purple-200 sticky top-0 z-40">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Button 
                variant="ghost" 
                size="sm"
                onClick={() => navigate('/app')}
              >
                <ArrowLeft className="w-4 h-4" />
              </Button>
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-gradient-to-r from-orange-500 to-red-500 rounded-full flex items-center justify-center">
                  <Trophy className="w-5 h-5 text-white" />
                </div>
                <h1 className="text-xl md:text-2xl font-bold bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent">
                  My Sports/Games
                </h1>
              </div>
            </div>
            <Button 
              onClick={() => setShowCreateModal(true)}
              size="sm"
              className="bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600"
            >
              <Plus className="w-4 h-4 mr-1" />
              Create New
            </Button>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-6">
        {myGames.length > 0 ? (
          <div className="space-y-6">
            <div className="text-center space-y-2">
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900">
                Your Created Sports/Games
              </h2>
              <p className="text-base md:text-lg text-gray-600">
                {myGames.length} game{myGames.length !== 1 ? 's' : ''} created by you
              </p>
            </div>

            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2">
              {myGames.map((game: any) => (
                <div key={game.id} className="relative">
                  <GameCard game={game} />
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <button className="absolute top-2 right-2 z-10 p-1 hover:bg-white/80 rounded transition-colors">
                        <EllipsisVertical className="w-4 h-4 text-gray-600" />
                      </button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem onClick={() => editGame(game)}>
                        <Edit className="w-4 h-4 mr-2" />
                        Edit
                      </DropdownMenuItem>
                      <DropdownMenuItem 
                        onClick={() => deleteGame(game.id)}
                        className="text-red-600 focus:text-red-600"
                      >
                        <Trash2 className="w-4 h-4 mr-2" />
                        Delete
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <Card className="text-center py-12 bg-gradient-to-br from-gray-50 to-gray-100 max-w-md mx-auto mt-12">
            <CardContent className="space-y-4">
              <div className="w-16 h-16 bg-gradient-to-r from-orange-400 to-red-400 rounded-full flex items-center justify-center mx-auto">
                <Search className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900">
                No games created yet
              </h3>
              <p className="text-gray-600 mb-4">
                Create your first sport or game to see it here
              </p>
              <Button 
                onClick={() => setShowCreateModal(true)}
                className="bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600"
              >
                <Plus className="w-4 h-4 mr-2" />
                Create Your First Game
              </Button>
            </CardContent>
          </Card>
        )}
      </div>

      <CreateGameModal 
        isOpen={showCreateModal}
        onClose={handleCloseModal}
        editGame={editingGame}
      />
    </div>
  );
};

export default MyGames;
