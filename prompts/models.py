from dataclasses import dataclass

@dataclass
class AIPrompt:
    id: str
    title: str
    content: str
    created_by: str
    created_at: str
    updated_at: str