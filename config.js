const getEnvironmentVariable = (environmentVariable) => {
  const unvalidatedEnvironmentVariable = process.env[environmentVariable];
  if (!unvalidatedEnvironmentVariable) {
    throw new Error(
      `Couldn't find environment variable: ${environmentVariable}`
    );
  } else {
    return unvalidatedEnvironmentVariable;
  }
};

export const config = {
  mailHost: getEnvironmentVariable("NEXT_PUBLIC_MAIL_HOST"),
  secret: getEnvironmentVariable("NEXT_PUBLIC_NEXTAUTH_SECRET"),
  dbLocal: getEnvironmentVariable("NEXT_PUBLIC_CONNECTION_STRING_LOCAL"),
  dbAtlas: getEnvironmentVariable("NEXT_PUBLIC_CONNECTION_STRING_ATLAS"),
  dbDocker: getEnvironmentVariable("NEXT_PUBLIC_CONNECTION_STRING_DOCKER"),
  localUrl: getEnvironmentVariable("NEXT_PUBLIC_NEXT_URL"),
};
