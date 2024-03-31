import { createClient } from "@/utils/supabase/server";

export default async function Analytics() {
  const supabase = createClient();

  const { data: cars } = await supabase.from("cars").select();

  return <pre>{JSON.stringify(cars, null, 2)}</pre>;
}
