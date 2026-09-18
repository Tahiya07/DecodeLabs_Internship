import { AmbientBackground } from "@/components/ambient-background";
import { Chatbot } from "@/components/chatbot";
import { Navigation } from "@/components/navigation";
import { ProcessFlow } from "@/components/process-flow";
import { ProjectInfo } from "@/components/project-info";

export default function Home() {
  return (
    <main>
      <AmbientBackground />
      <Navigation />
      <Chatbot />
      <ProcessFlow />
      <ProjectInfo />
      <footer>
        ELIO / PROJECT 01

      </footer>
    </main>
  );
}
