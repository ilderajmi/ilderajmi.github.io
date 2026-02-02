# Workflow Orchestration

## 1. Plan Mode Default
- Enter plan mode for ANY non-trivial task (3+ steps or architectural decisions)
- If something goes sideways, STOP and re-plan immediately
- Iterate on the plan until it's solid, then switch to auto-accept mode
- "A good plan is really important" — Boris Cherny

## 2. Verification First (Most Important)
- Give Claude a way to verify its work — this 2-3x the quality of results
- Run tests, check logs, open browser, use simulators
- Never mark a task complete without proving it works
- Build domain-specific verification into your workflow

## 3. Self-Improvement Loop (Compounding Engineering)
- After ANY correction: update `CLAUDE.md` with the pattern
- Tag @.claude in PRs to auto-update rules
- Review lessons at session start
- The goal: Claude gets better over time, not just per-session

## 4. Subagent Strategy
- Use subagents to keep main context window clean
- One task per subagent for focused execution
- Common patterns: code-simplifier, verify-app, build-validator

## 5. Slash Commands for Inner Loops
- Create commands for workflows you do many times a day
- Store in `.claude/commands/`, check into git
- Embed bash to pre-compute info (git status, etc.)
- Example: `/commit-push-pr`

## 6. Hooks for Automation
- Use PostToolUse hooks to auto-format code
- Catches the 10% of formatting issues that slip through
- Prevents CI failures from style issues

## 7. Permission Management
- Don't use `--dangerously-skip-permissions` by default
- Pre-allow known safe commands via `/permissions`
- Store in `.claude/settings.json`, share with team

## 8. Autonomous Bug Fixing
- When given a bug report: just fix it
- Point at logs, errors, failing tests — then resolve them
- Zero context switching required from the user

# Core Principles

- **Simplicity First**: Make every change as simple as possible
- **Verify Everything**: Feedback loops are more valuable than speed
- **Compound Learning**: Every mistake becomes a rule
