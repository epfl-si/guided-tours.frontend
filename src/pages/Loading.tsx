import { Spinner } from "@/components/ui/spinner";

export const LoadingPage = () => {
  return (
    <div className="flex h-full min-h-[50vh] justify-center items-center">
      <Spinner className="size-10" />
    </div>
  )
}
