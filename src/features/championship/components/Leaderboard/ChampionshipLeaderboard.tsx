import React from 'react';
import { type ChampionshipHighScore } from '../../../../store/useQuizChampionshipStore';
import { type Labels } from '../../../../locales/types';
import { AvatarDisplay } from '../../../../components/UI/AvatarDisplay';
import leaderboardStyles from './ChampionshipLeaderboard.module.css';

interface ChampionshipLeaderboardProps {
  highScores: ChampionshipHighScore[];
  activeProfile: { id: string } | null;
  labels: Labels;
  language: 'fr' | 'en';
}

export const ChampionshipLeaderboard: React.FC<ChampionshipLeaderboardProps> = ({
  highScores,
  activeProfile,
  labels,
  language,
}) => {
  return (
    <div className={leaderboardStyles.leaderboardSection}>
      <h3 className={leaderboardStyles.leaderboardTitle}>{labels.championship.leaderboardTitle}</h3>
      {highScores.length > 0 ? (
        <div className={leaderboardStyles.leaderboardList}>
          {highScores.map((score: ChampionshipHighScore, index: number) => {
            const isCurrentProfile = activeProfile && score.profileId === activeProfile.id;
            
            let rankStyle = leaderboardStyles.rankBadge;
            if (index === 0) rankStyle = `${leaderboardStyles.rankBadge} ${leaderboardStyles.rankBadgeGold}`;
            else if (index === 1) rankStyle = `${leaderboardStyles.rankBadge} ${leaderboardStyles.rankBadgeSilver}`;
            else if (index === 2) rankStyle = `${leaderboardStyles.rankBadge} ${leaderboardStyles.rankBadgeBronze}`;

            const formattedDate = new Date(score.date).toLocaleDateString(language === 'fr' ? 'fr-FR' : 'en-US', {
              month: 'short',
              day: 'numeric',
              hour: '2-digit',
              minute: '2-digit'
            });

            return (
              <div 
                key={score.id} 
                className={`${leaderboardStyles.leaderboardItem} ${isCurrentProfile ? leaderboardStyles.leaderboardItemActive : ''}`}
              >
                <div className={leaderboardStyles.leaderboardLeft}>
                  <div className={rankStyle}>
                    {index === 0 ? '🥇' : index === 1 ? '🥈' : index === 2 ? '🥉' : index + 1}
                  </div>
                  <div className={leaderboardStyles.playerInfo}>
                    <AvatarDisplay avatar={score.profileAvatar} size="small" name={score.profileName} />
                    <div>
                      <div className={leaderboardStyles.playerName}>{score.profileName}</div>
                      <div className={leaderboardStyles.timeSpentText}>{formattedDate} • {score.timeSpent}s</div>
                    </div>
                  </div>
                </div>
                <div className={leaderboardStyles.scoreBadge}>
                  <span>{score.score}</span> / 10
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <p className={leaderboardStyles.noScoresText}>{labels.championship.noScores}</p>
      )}
    </div>
  );
};
