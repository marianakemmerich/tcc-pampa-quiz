export interface LevelModalProps {
    isOpen: boolean
    onClose: () => void
    selectedLevel: string | null
    setSelectedLevel: (level: string) => void
    onStartGame: () => void
    category: string
}