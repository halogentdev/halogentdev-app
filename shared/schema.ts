import { z } from 'zod';

export const AgentSchema = z.object({
  id: z.string(),
  name: z.string(),
  description: z.string().optional(),
  owner: z.string(),
  model: z.string(),
  skills: z.array(z.string()),
  runs: z.number(),
  status: z.enum(['online','offline','deploying'])
});

export type Agent = z.infer<typeof AgentSchema>;

export const SkillSchema = z.object({
  id: z.string(),
  name: z.string(),
  category: z.string()
});
export type Skill = z.infer<typeof SkillSchema>;

export const DeploymentSchema = z.object({
  id: z.string(),
  agentId: z.string(),
  status: z.string()
});
export type Deployment = z.infer<typeof DeploymentSchema>;

export const RunSchema = z.object({
  id: z.string(),
  agentId: z.string(),
  status: z.string(),
  timestamp: z.date()
});
export type Run = z.infer<typeof RunSchema>;

export const PrivacySettingsSchema = z.object({
  promptLogging: z.boolean(),
  memoryMode: z.enum(['local','hosted']),
  secretOwnership: z.enum(['user','server']),
  telemetry: z.boolean(),
  allowlist: z.array(z.string())
});
export type PrivacySettings = z.infer<typeof PrivacySettingsSchema>;

export const PlaygroundMessageSchema = z.object({
  from: z.enum(['user','agent']),
  text: z.string()
});
export type PlaygroundMessage = z.infer<typeof PlaygroundMessageSchema>;

export const PublicAgentSchema = AgentSchema;
export type PublicAgent = Agent;
