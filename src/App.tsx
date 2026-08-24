import { LazyMotion, MotionConfig, domAnimation } from "framer-motion"
import { WorkspaceProvider } from "./context/WorkspaceContext"
import { VSCodeLayout } from "./layouts/VSCodeLayout"

function App() {
  return (
    <LazyMotion features={domAnimation}>
      <MotionConfig reducedMotion="user">
        <WorkspaceProvider>
          <VSCodeLayout />
        </WorkspaceProvider>
      </MotionConfig>
    </LazyMotion>
  )
}

export default App
