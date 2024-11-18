export interface LevelModalProps {
    isOpen: boolean;
    onClose: () => void;
    selectedLevel: string;
    setSelectedLevel: (level: string) => void;
    onStartGame: () => void;
}