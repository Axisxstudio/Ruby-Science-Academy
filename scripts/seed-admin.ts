import { createClient } from "@supabase/supabase-js";

async function run() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
  const email = process.env.DEFAULT_ADMIN_EMAIL;
  const password = process.env.DEFAULT_ADMIN_PASSWORD;

  if (!supabaseUrl || !serviceRoleKey || !email || !password) {
    throw new Error(
      "Missing NEXT_PUBLIC_SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY, DEFAULT_ADMIN_EMAIL, or DEFAULT_ADMIN_PASSWORD.",
    );
  }

  const admin = createClient(supabaseUrl, serviceRoleKey, {
    auth: {
      autoRefreshToken: false,
      persistSession: false,
    },
  });

  const { data: listedUsers, error: listError } = await admin.auth.admin.listUsers({
    page: 1,
    perPage: 200,
  });

  if (listError) {
    throw listError;
  }

  const existingUser = listedUsers.users.find((user) => user.email === email);

  if (existingUser) {
    const { error: updateError } = await admin.auth.admin.updateUserById(
      existingUser.id,
      {
        password,
        email_confirm: true,
        app_metadata: { role: "admin" },
        user_metadata: { role: "admin" },
      },
    );

    if (updateError) {
      throw updateError;
    }

    console.log(`Updated existing admin user: ${email}`);
    return;
  }

  const { error: createError } = await admin.auth.admin.createUser({
    email,
    password,
    email_confirm: true,
    app_metadata: { role: "admin" },
    user_metadata: { role: "admin" },
  });

  if (createError) {
    throw createError;
  }

  console.log(`Created admin user: ${email}`);
}

run().catch((error) => {
  console.error(error);
  process.exit(1);
});
